import { CheckCircle2, X } from 'lucide-react'
import { toast } from 'sonner'

export class MyToaster {
  static success(message: string) {
    toast(message, {
      style: {
        backgroundColor: 'hsl(221.2 83.2% 53.3%)',
        color: 'white'
      },
      position: 'top-center',
      icon: <CheckCircle2 size={16} />
    })
  }

  static error(message: string) {
    toast(message, {
      style: {
        backgroundColor: 'hsl(0 84.2% 60.2%)',
        color: 'white'
      },
      position: 'top-center',
      icon: <X size={16} />

    })
  }
}