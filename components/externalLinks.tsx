"use server"
import DiscordSVG from '@/public/discord.svg'
import GithubSVG from '@/public/github.svg'
import ThreeCXSVG from '@/public/3cx.svg'
import CollabSVG from '@/public/collab.svg'
import PartnerPortalSVG from '@/public/partner.svg'
import GuidesSVG from '@/public/references.svg'
import ChatSVG from '@/public/chat.svg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default async function ExternalLinks() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  if (email?.includes('@getquantic.com')) {
    return (
      <div id='socials'>
        <Discord />
        <Github />
        <InternalLinks />
      </div>
    )
  } else {
    return (
      <div id='socials'>
        <Github />
      </div>
    )
  }

}

function Discord() {
  return (
    <div id='discord' className='mr-5'>
      <DiscordSVG className="h-[70px] w-[70px]" />
      <p className='text-xs'>Need Help?</p>
    </div>
  )
}

function Github() {
  return (
    <div id='github' className='mr-5'>
      <a href="https://github.com/coleb229/improved-call-notes-app" target='_blank'>
        <GithubSVG className="h-[70px] w-[70px]" />
      </a>
    </div>
  )
}

function InternalLinks() {
  return (
    <div id='internalLinks'>
      <ThreeCX />
      <Collab />
      <PartnerPortal />
      <Chat />
      <Guides />
    </div>
  )
}

function ThreeCX() {
  return (
    <div id='threeCX' className='mr-2'>
      <a href="https://quantic.pa.3cx.us/webclient/#/login" target='_blank'>
        <ThreeCXSVG className="h-[50px] w-[50px]" />
        <p className='text-xs text-center'>3CX</p>
      </a>
    </div>
  )
}

function Collab() {
  return (
    <div id='collab' className='mr-2'>
      <a href="https://collab.metispro.com/" target='_blank'>
        <CollabSVG className="h-[50px] w-[50px]" />
        <p className='text-xs text-center'>Collab</p>
      </a>
    </div>
  )
}

function PartnerPortal () {
  return (
    <div id='partnerPortal' className='mr-2 h-[60px] w-[60px]'>
      <a href="https://partnerportal.metispro.com/login" target='_blank'>
        <PartnerPortalSVG className="h-[50px] w-[50px]" />
        <p className='text-xs text-center'>Partner Portal</p>
      </a>
    </div>
  )
}

function Guides() {
  return (
    <div id='guides' className='mr-2'>
      <DropdownMenu>
        <div id='guidesButton'>
          <DropdownMenuTrigger>
            <GuidesSVG className="h-[50px] w-[50px]"/>
            <p className='text-xs text-center'>Guides</p>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ponder</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a href='https://collab.metispro.com/ponder/' target='_blank'>Ponder</a>
          </DropdownMenuItem>
          <DropdownMenuLabel>Drive Folders</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a href='https://drive.google.com/drive/folders/1fIgkicbJ5lbi8M3CV-VFuOYNNux0LCLI' target='_blank'>Guides (Work in Progress)</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href='https://drive.google.com/drive/folders/1fIgkicbJ5lbi8M3CV-VFuOYNNux0LCLI' target='_blank' className='font-normal'>Resources [In Progress]</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function Chat() {
  return (
    <div id='chat' className='mr-2'>
      <a href="https://chat.metispro.com/group/support" target='_blank'>
        <ChatSVG className="h-[50px] w-[50px]" />
      </a>
      <p className='text-xs text-center'>Chat</p>
    </div>
  )
}