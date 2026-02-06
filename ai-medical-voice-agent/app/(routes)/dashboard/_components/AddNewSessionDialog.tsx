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

const AddNewSessionDialog = () => {

  const [note, setNote] = useState<string>();

  const [loading, setLoading] = useState(false);

  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors', {
      notes: note
    });
    
    console.log(result.data);
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
                <div>
                  <h2>Enter Symptoms or Any Other Details</h2>
                  <Textarea placeholder='Type Details here' className='h-[250px] mt-1'
                  onChange={(e)=>setNote(e.target.value)}/>
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
              <Button disabled={!note} onClick={() => OnClickNext()}>Next<IconArrowRight/></Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>  
  )
}

export default AddNewSessionDialog
