import React from 'react'
import alex from "../assets/Alex Monolith.png"
import img from "../assets/Icon (1).png"
import img2 from "../assets/Icon (2).png"
import consoleIcon from "../assets/Container (2).png"
import share from "../assets/Icon (3).png"
import icon from "../assets/Icon (4).png"
import icon1 from "../assets/Icon (5).png"
import icon2 from "../assets/Icon (6).png"
import icon3 from "../assets/Icon (7).png"
import icon4 from "../assets/Icon (8).png"
const stats = [
  {
    value: '1,284',
    label: 'Tasks Completed',
    badge: '+12% vs last month',
    accent: 'text-[#F4B97A]',
    img: icon1
  },
  {
    value: '4,912',
    label: 'Total Commits',
    badge: 'Top 2% globally',
    accent: 'text-[#8AA7FF]',
    img: icon2
  },
  {
    value: '42 Days',
    label: 'Activity Streak',
    badge: 'Current streak',
    accent: 'text-[#FFB35C]',
    img: icon3
  },
]

const heatmapRows = [
  [0, 1, 1, 2, 3, 2, 1, 0, 2, 2, 3, 4],
  [1, 2, 3, 2, 1, 1, 2, 3, 4, 2, 1, 0],
  [0, 1, 2, 4, 3, 2, 1, 2, 3, 4, 2, 1],
  [1, 2, 4, 3, 2, 1, 0, 1, 2, 3, 4, 2],
  [0, 1, 2, 2, 3, 4, 2, 1, 1, 2, 3, 4],
  [1, 3, 2, 1, 0, 1, 2, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 2, 1, 1, 2, 4, 3, 2, 1],
]

const intensityClasses = [
  'bg-[#1A1D24]',
  'bg-[#36384A]',
  'bg-[#575777]',
  'bg-[#8074C9]',
  'bg-[#C8C1FF]',
]

const connectedAccounts = [
  { name: 'GitHub Profile', icon: 'GH' },
  { name: 'LinkedIn', icon: 'in' },
  { name: 'Behance', icon: 'Be' },
]

const expertise = ['TypeScript', 'Rust', 'Kubernetes', 'GraphQL', 'Next.js', 'Tailwind']

const activities = [
  {
    title: 'Merged Pull Request #294 into main',
    subtitle: 'Project: Kinetic Design System',
    time: '2h ago',
    tag: 'Production',
    tagColor: 'text-[#F4B97A]',
  },
  {
    title: 'Approved architectural design for Core Auth v2',
    subtitle: 'Assigned by: Engineering VP',
    time: '5h ago',
    tag: 'Review',
    tagColor: 'text-[#B4A7FF]',
  },
  {
    title: 'Resolved critical vulnerability CVE-2024-0812',
    subtitle: 'Hotfix deployed to staging',
    time: 'Yesterday',
    tag: 'Security',
    tagColor: 'text-[#FF8B8B]',
  },
]

const cardClass =
  'rounded-[20px] border border-white/6 bg-[linear-gradient(180deg,#171A21,#13161C)] shadow-[0_18px_44px_rgba(0,0,0,0.35)]'

const Profile = () => {
  return (
    <div className='min-h-screen bg-[#0B0E14] px-4 py-6 text-[#DFE2EB] sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-[1240px] flex-col gap-5'>
        <section className={`${cardClass} overflow-hidden`}>
          <div className='h-1 w-full bg-[linear-gradient(90deg,#169CFF,#4E63FF,#8A7CFF)]' />

          <div className='flex flex-col gap-6 p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6'>
            <div className='flex flex-col gap-5 md:flex-row md:items-center'>
              <div className='relative w-fit'>
                <div className='rounded-[18px] border border-[#2A3140] bg-[#11141B] p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.45)]'>
                  <img
                    width={160}
                    src={alex}
                    alt='Alex Monolith avatar'
                    className='h-[132px] w-[104px] rounded-[14px] object-cover sm:h-[150px] sm:w-[118px]'
                  />
                </div>
                <div className='absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#404660] bg-[#7E6BEB] text-[13px] shadow-[0_10px_20px_rgba(126,107,235,0.35)]'>
                  <img src={icon} alt="icon" />
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex flex-col gap-3 xl:flex-row xl:items-center'>
                  <h1 className='max-w-[260px] text-[38px] leading-[0.95] font-extrabold tracking-[-0.04em] text-[#E8EBF5] sm:text-[52px]'>
                    Alex Monolith
                  </h1>

                  <div className='flex flex-wrap gap-2'>
                    <span className='rounded-[6px] border border-dashed border-[#53617C] bg-[#202531] px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-[#ADC6FF]'>
                      Lead Architect
                    </span>
                    <span className='rounded-[6px] border border-[#564AA2] bg-[#5E56D133] px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-[#C9C0FF]'>
                      Maintainer
                    </span>
                  </div>
                </div>

                <div className='flex flex-col gap-2 text-[14px] text-[#AEB5C7] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4'>
                  <div className='flex items-center gap-2'>
                    <img src={img} alt='location' className='h-4 w-4 opacity-80' />
                    <span>Berlin, DE</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={img2} alt='github' className='h-4 w-4 opacity-80' />
                    <span>github.com/alex-mono</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={consoleIcon} alt='handle' className='h-4 w-4 opacity-80' />
                    <span>@0xAlex</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row lg:justify-end'>
              <button className='inline-flex items-center justify-center gap-3 rounded-[10px] border border-white/6 bg-[#20242D] px-5 py-3 text-[14px] font-medium text-[#E0E3EE] transition hover:bg-[#262B36]'>
                <img src={share} alt='share' className='h-4 w-4 opacity-90' />
                Share Profile
              </button>
              <button className='rounded-[10px] bg-[linear-gradient(135deg,#D2CCFF,#7164EA)] px-5 py-3 text-[14px] font-bold text-[#24106F] shadow-[0_12px_28px_rgba(113,100,234,0.4)] transition hover:brightness-105'>
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        <section className='grid gap-4 lg:grid-cols-3'>
          {stats.map((item) => (
            <article key={item.label} className={`${cardClass} p-5`}>
              <div className='mb-10 flex items-start justify-between gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/6 bg-[#1A1E26] text-[15px] text-[#C9D0E3]'>
                  <img src={item.img} alt="" />
                </div>
                <span className={`rounded-[6px] bg-[#1C2028] px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${item.accent}`}>
                  {item.badge}
                </span>
              </div>
              <div className='space-y-1'>
                <div className='text-[38px] font-extrabold tracking-[-0.04em] text-[#E9EDF7]'>{item.value}</div>
                <p className='text-[14px] text-[#8E96A8]'>{item.label}</p>
              </div>
            </article>
          ))}
        </section>

        <section className='grid gap-4 xl:grid-cols-[minmax(0,2fr)_320px]'>
          <article className={`${cardClass} p-5 lg:p-6`}>
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-[9px] border border-white/6 bg-[#1A1E26] text-[13px]'>
                  <img src={icon4} alt="" />
                </div>
                <h2 className='text-[20px] font-semibold text-[#E7EBF5]'>Contribution Activity</h2>
              </div>

              <div className='flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#7E8698]'>
                <span>Less</span>
                <div className='flex items-center gap-1.5'>
                  {intensityClasses.map((shade) => (
                    <span key={shade} className={`h-3 w-3 rounded-[3px] ${shade}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            <div className='grid gap-2 overflow-x-auto rounded-[16px] border border-white/5 bg-[#11141A] p-4'>
              {heatmapRows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex min-w-[420px] gap-2'>
                  {row.map((level, cellIndex) => (
                    <span
                      key={`${rowIndex}-${cellIndex}`}
                      className={`h-9 flex-1 rounded-[6px] border border-white/4 ${intensityClasses[level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className='mt-6 grid gap-4 border-t border-white/6 pt-5 sm:grid-cols-3'>
              <div>
                <p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-[#70788B]'>Longest Streak</p>
                <p className='text-[32px] font-bold tracking-[-0.03em] text-[#E8ECF6]'>124 Days</p>
              </div>
              <div>
                <p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-[#70788B]'>Total Review Ops</p>
                <p className='text-[32px] font-bold tracking-[-0.03em] text-[#E8ECF6]'>842</p>
              </div>
              <div>
                <p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-[#70788B]'>Public Repos</p>
                <p className='text-[32px] font-bold tracking-[-0.03em] text-[#E8ECF6]'>34</p>
              </div>
            </div>
          </article>

          <div className='flex flex-col gap-4'>
            <article className={`${cardClass} p-5`}>
              <h3 className='mb-4 text-[13px] uppercase tracking-[0.22em] text-[#8B92A4]'>Connected Accounts</h3>
              <div className='space-y-3'>
                {connectedAccounts.map((account) => (
                  <div
                    key={account.name}
                    className='flex items-center justify-between rounded-[14px] border border-white/6 bg-[#171B22] px-4 py-3'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/6 bg-[#101319] text-[14px] font-semibold text-[#F2F4F9]'>
                        {account.icon}
                      </div>
                      <span className='text-[14px] text-[#DCE0EA]'>{account.name}</span>
                    </div>
                    <span className='text-[16px] text-[#8F97A8]'>{'>'}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${cardClass} p-5`}>
              <h3 className='mb-4 text-[13px] uppercase tracking-[0.22em] text-[#8B92A4]'>Expertise</h3>
              <div className='flex flex-wrap gap-2'>
                {expertise.map((item) => (
                  <span
                    key={item}
                    className='rounded-[8px] border border-white/6 bg-[#191D25] px-3 py-2 text-[12px] text-[#D6DAE5]'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={`${cardClass} p-5 lg:p-6`}>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <h2 className='text-[22px] font-semibold text-[#E7EBF5]'>Recent Activity</h2>
            <button className='text-[13px] font-medium text-[#B9B1FF] transition hover:text-[#D7D1FF]'>View All Log</button>
          </div>

          <div className='space-y-3'>
            {activities.map((activity, index) => (
              <article
                key={activity.title}
                className='flex flex-col gap-3 rounded-[16px] border border-white/6 bg-[#171B22] px-4 py-4 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='flex items-start gap-4'>
                  <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/6 bg-[#101319] text-[15px] ${index === 2 ? 'text-[#FF8B8B]' : 'text-[#B8C4FF]'}`}>
                    {index === 0 ? '<>' : index === 1 ? '//' : '!'}
                  </div>
                  <div>
                    <p className='text-[15px] font-medium text-[#E4E8F2]'>{activity.title}</p>
                    <p className='mt-1 text-[13px] text-[#8891A3]'>{activity.subtitle}</p>
                  </div>
                </div>

                <div className='text-right sm:min-w-[110px]'>
                  <p className='text-[12px] text-[#8991A2]'>{activity.time}</p>
                  <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${activity.tagColor}`}>
                    {activity.tag}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
