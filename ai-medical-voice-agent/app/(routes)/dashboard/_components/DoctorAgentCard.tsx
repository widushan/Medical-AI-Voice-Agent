"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

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
  return (
    <div className='border border-gray-200 rounded-lg p-4'>
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-[300px] object-cover rounded-xl'/>
      <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button className='w-full mt-2'>Start Consultation <IconArrowRight /></Button>
    </div>
  )
}

export default DoctorAgentCard
