"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'


export type doctorAgent = {
  id: number,
  specialist: string,
  description: string,
  image: string,
  agentPrompt: string
}

type props = {
  doctorAgent: doctorAgent
}

function DoctorAgentCard({doctorAgent}: props) {

  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const onStartConsultation = async () => {
    setLoading(true);
    // Save All Info To Databse
    const result = await axios.post('/api/session-chat', {
      notes: 'New Query',
      selectedDoctor: doctorAgent
    });
    console.log(result.data)
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      //Route new Conversation Screen
      router.push('/dashboard/medical-agent/' + result.data.sessionId);

    }
    setLoading(false);
  }

  return (
    <div className='border border-gray-200 rounded-lg p-4'>
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-[300px] object-cover rounded-xl'/>
      <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button style={{ cursor: "pointer" }} className='w-full mt-2' onClick={onStartConsultation}>Start Consultation {loading?<Loader2Icon className='animate-spin'/>: <IconArrowRight />}</Button>
    </div>
  )
}

export default DoctorAgentCard
