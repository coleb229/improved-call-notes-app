import DiscordSVG from '@/public/discord.svg'
import GithubSVG from '@/public/github.svg'

export default function ExternalLinks() {
  return (
    <div id='socials'>
      <div id='github' className='mr-5'>
        <a href="https://github.com/coleb229/improved-call-notes-app" target='_blank'>
          <GithubSVG className="h-[70px] w-[70px]" />
        </a>
      </div>
      <div id='github'>
        <a href="https://discord.gg/s4dSchmW" target='_blank'>
          <DiscordSVG className="h-[70px] w-[70px]" />
          <p className='text-xs'>Need Help?</p>
        </a>
      </div>
    </div>
  )
}