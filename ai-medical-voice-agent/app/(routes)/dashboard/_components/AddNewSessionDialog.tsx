"use client"
import React from 'react'
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

const AddNewSessionDialog = () => {
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
                  <Textarea placeholder='Type Details here' className='h-[250px] mt-1'/>
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
              <Button>Start<IconArrowRight/></Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>  
  )
}

export default AddNewSessionDialog
