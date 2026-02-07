"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import { Loader2 } from 'lucide-react'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'

const AddNewSessionDialog = () => {

  const [note, setNote] = useState<string>();

  const [loading, setLoading] = useState(false);

  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();

  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();

  const router = useRouter();


  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors', {
      notes: note
    });
    
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  }

  const onStartConsultation = async () => {
    setLoading(true);
    // Save All Info To Databse
    const result = await axios.post('/api/session-chat', {
      notes: note,
      selectedDoctor: selectedDoctor
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button className='mt-3'>+ Start a Consultation</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
                {!suggestedDoctors ? <div>
                  <h2>Add Symptoms or Any Other Details</h2>
                  <Textarea placeholder='Type Detail here...'
                    className='h-[200px] mt-1'
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div> : 
                <div>
                  <h2>Select the Doctor</h2>
                  <div className='grid grid-cols-2 gap-5'>
                    {/* // Suggested Doctors */}
                    {suggestedDoctors.map((doctor, index) => (
                      <SuggestedDoctorCard doctorAgent={doctor} key={index}
                      setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                      //@ts-ignore
                      selectedDoctor={selectedDoctor}
                      />
                    ))}
                  </div>
                </div>}
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
              {!suggestedDoctors ? <Button disabled={!note || loading} onClick={() => OnClickNext()}>
                Next {loading ? <Loader2 className='animate-spin' /> : <IconArrowRight/>}
              </Button> :
              <Button disabled={loading || !selectedDoctor} onClick={()=>onStartConsultation()}>Start Consultation
                {loading ? <Loader2 className='animate-spin' /> : <IconArrowRight/>}
              </Button>}
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>  
  )
}

export default AddNewSessionDialog
