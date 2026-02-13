"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';


type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string
}

type messages={
  role: string,
  text: string
}

function MedicalVoiceAgent() {

  const { sessionId } = useParams();

  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();

  const [callStarted, setCallStarted] = useState(false);

  const [vapiInstance, setVapiInstance] = useState<any>();

  const [listeners, setListeners] = useState<{
    onCallStart?: () => void;
    onCallEnd?: () => void;
    onMessage?: (message: any) => void;
    onSpeechStart?: () => void;
    onSpeechEnd?: () => void;
  }>({});

  const [currentRole, setCurrentRole] = useState<string|null>();

  const [liveTranscript, setLiveTranscript] = useState<string>();

  const [messages, setMessages] = useState<messages[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  }

  const StartCall=()=>{
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    
    // Create and store listener functions
    const onCallStart = () => {
      console.log('Call started');
      setCallStarted(true);
    };
    
    const onCallEnd = () => {
      setCallStarted(false);
      console.log('Call ended');
    };
    
    const onMessage = (message: any) => {
      if (message.type === 'transcript') {
        const {role, transcriptType, transcript} = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == 'partial'){
          setLiveTranscript(transcript);
          setCurrentRole(role);
        }
        else if (transcriptType == 'final'){
          // Final Transcript
          setMessages((prev: any) => [...prev, { role: role, text: transcript }])
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    };

    const onSpeechStart = () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    };

    const onSpeechEnd = () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
    };
    
    // Store listeners for later removal
    setListeners({ onCallStart, onCallEnd, onMessage, onSpeechStart, onSpeechEnd });
    
    // Register listeners
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_AGENT_ASSISTANT_ID);
  }

  const endCall = async() => {
    setLoading(true);
    if (!vapiInstance) return;
    
    // Stop the call
    vapiInstance.stop();
    
    // Remove listeners using stored functions (same reference required by Vapi)
    if (listeners.onCallStart) vapiInstance.off('call-start', listeners.onCallStart);
    if (listeners.onCallEnd) vapiInstance.off('call-end', listeners.onCallEnd);
    if (listeners.onMessage) vapiInstance.off('message', listeners.onMessage);
    if (listeners.onSpeechStart) vapiInstance.off('speech-start', listeners.onSpeechStart);
    if (listeners.onSpeechEnd) vapiInstance.off('speech-end', listeners.onSpeechEnd);

    
    // Reset state
    setCallStarted(false);
    setVapiInstance(null);
    setListeners({});

    const result = await GenerateReport();
    
    setLoading(false);
  };


  const GenerateReport = async () => {
    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId
    })
    // Medical report shape: sessionId, agent, user, timestamp, chiefComplaint, summary, symptoms, duration, severity, medicationsMentioned, recommendations
    console.log('Medical report:', result.data);
    return result.data;
  }



  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} /> {callStarted ? 'Connected' : 'Not Connected'}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00 : 00</h2>
      </div>
      
        {sessionDetail && (
          <div className='flex items-center flex-col mt-10'>
            <Image src={sessionDetail.selectedDoctor.image} alt={sessionDetail.selectedDoctor.specialist??''} 
            width={120} height={120} 
            className='h-[100px] w-[100px] object-cover rounded-full'
            />
            <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
            <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

            <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72' style={{paddingLeft: '80px', paddingRight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {messages?.slice(-4).map((msg:messages, index) => (
                <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
              ))}
              {liveTranscript && liveTranscript?.length > 0 &&<h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>}
            </div>

            {!callStarted? <Button className='mt-20 flex items-center gap-2' onClick={StartCall} disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : <PhoneCall />} Start Call </Button>
            :<Button variant={'destructive'} onClick={endCall} disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : <PhoneOff />} Disconnect </Button>
            }
          </div>
        )}
    </div>
  )
}

export default MedicalVoiceAgent

