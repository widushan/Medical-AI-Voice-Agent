"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, PhoneCall, PhoneOff } from 'lucide-react';
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

function MedicalVoiceAgent() {

  const { sessionId } = useParams();

  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();

  const [callStarted, setCallStarted] = useState(false);

  const [vapiInstance, setVapiInstance] = useState<any>();

  const [listeners, setListeners] = useState<{
    onCallStart?: () => void;
    onCallEnd?: () => void;
    onMessage?: (message: any) => void;
  }>({});

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
        console.log(`${message.role}: ${message.transcript}`);
      }
    };
    
    // Store listeners for later removal
    setListeners({ onCallStart, onCallEnd, onMessage });
    
    // Register listeners
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_AGENT_ASSISTANT_ID);
  }

  const endCall = () => {
    if (!vapiInstance) return;
    
    // Stop the call
    vapiInstance.stop();
    
    // Remove listeners using stored functions
    if (listeners.onCallStart) vapiInstance.off('call-start', listeners.onCallStart);
    if (listeners.onCallEnd) vapiInstance.off('call-end', listeners.onCallEnd);
    if (listeners.onMessage) vapiInstance.off('message', listeners.onMessage);
    
    // Reset state
    setCallStarted(false);
    setVapiInstance(null);
    setListeners({});
  };



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

            <div className='mt-32'>
              <h2 className='text-gray-400'>Assistant Msg</h2>
              <h2 className='text-lg'>User Msg</h2>
            </div>

            {!callStarted? <Button className='mt-20 flex items-center gap-2' onClick={StartCall}>
              <PhoneCall /> Start Call </Button>
            :<Button variant={'destructive'} onClick={endCall}><PhoneOff />Disconnect</Button>
            }
          </div>
        )}
    </div>
  )
}

export default MedicalVoiceAgent