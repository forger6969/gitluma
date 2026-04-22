import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { toggleTheme } from "../store/slices/themeSlice"

const stats = [
  {
    value: '1,284',
    label: 'Tasks Completed',
    badge: '12% vs last month',
    img: icon1,
  },
  {
    value: '4,912',
    label: 'Total Commits',
    badge: 'Top 2% globally',
    img: icon2,
  },
  {
    value: '42 Days',
    label: 'Activity Streak',
    badge: 'Current streak',
    img: icon3,
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
  },
  {
    title: 'Approved architectural design for Core Auth v2',
    subtitle: 'Assigned by: Engineering VP',
    time: '5h ago',
    tag: 'Review',
  },
  {
    title: 'Resolved critical vulnerability CVE-2024-0812',
    subtitle: 'Hotfix deployed to staging',
    time: 'Yesterday',
    tag: 'Security',
  },
]

const themes = {
  dark: {
    page: 'bg-[#0B0E14] text-[#DFE2EB]',
    card: 'border-white/6 bg-[linear-gradient(180deg,#171A21,#13161C)] shadow-[0_18px_44px_rgba(0,0,0,0.35)]',
    topBar: 'bg-[linear-gradient(90deg,#169CFF,#4E63FF,#8A7CFF)]',
    avatarFrame: 'border-[#2A3140] bg-[#11141B] shadow-[0_12px_28px_rgba(0,0,0,0.45)]',
    floatingBadge: 'border-[#404660] bg-[#7E6BEB] shadow-[0_10px_20px_rgba(126,107,235,0.35)]',
    heading: 'text-[#E8EBF5]',
    labelPrimary: 'border-dashed border-[#53617C] bg-[#202531] text-[#ADC6FF]',
    labelSecondary: 'border-[#564AA2] bg-[#5E56D133] text-[#C9C0FF]',
    subtext: 'text-[#AEB5C7]',
    shareButton: 'border-white/6 bg-[#20242D] text-[#E0E3EE] hover:bg-[#262B36]',
    editButton: 'bg-[linear-gradient(135deg,#D2CCFF,#7164EA)] text-[#24106F] shadow-[0_12px_28px_rgba(113,100,234,0.4)] hover:brightness-105',
    toggleButton: 'border-white/8 bg-[#151922] text-[#F3F5FA] hover:bg-[#1B202B]',
    statIcon: 'border-white/6 bg-[#1A1E26] text-[#C9D0E3]',
    badgeBg: 'bg-[#1C2028]',
    statValue: 'text-[#E9EDF7]',
    statLabel: 'text-[#8E96A8]',
    sectionIcon: 'border-white/6 bg-[#1A1E26]',
    sectionTitle: 'text-[#E7EBF5]',
    mutedLabel: 'text-[#7E8698]',
    heatmapWrapper: 'border-white/5 bg-[#11141A]',
    divider: 'border-white/6',
    metricLabel: 'text-[#70788B]',
    metricValue: 'text-[#E8ECF6]',
    smallTitle: 'text-[#8B92A4]',
    innerCard: 'border-white/6 bg-[#171B22]',
    innerIcon: 'border-white/6 bg-[#101319] text-[#F2F4F9]',
    bodyText: 'text-[#DCE0EA]',
    expertiseChip: 'border-white/6 bg-[#191D25] text-[#D6DAE5]',
    linkButton: 'text-[#B9B1FF] hover:text-[#D7D1FF]',
    activityCard: 'border-white/6 bg-[#171B22]',
    activityIcon: 'border-white/6 bg-[#101319]',
    activityTitle: 'text-[#E4E8F2]',
    activitySubtitle: 'text-[#8891A3]',
    activityTime: 'text-[#8991A2]',
    accents: ['text-[#F4B97A]', 'text-[#8AA7FF]', 'text-[#FFB35C]'],
    tagColors: {
      Production: 'text-[#F4B97A]',
      Review: 'text-[#B4A7FF]',
      Security: 'text-[#FF8B8B]',
    },
    activityIconColors: ['text-[#B8C4FF]', 'text-[#B8C4FF]', 'text-[#FF8B8B]'],
    heatmap: ['bg-[#1A1D24]', 'bg-[#36384A]', 'bg-[#575777]', 'bg-[#8074C9]', 'bg-[#C8C1FF]'],
  },
  light: {
    page: 'bg-[linear-gradient(180deg,#F7F9FC,#EEF3FF)] text-[#1F2937]',
    card: 'border-[#D6DFEE] bg-[linear-gradient(180deg,#FFFFFF,#F6F9FF)] shadow-[0_18px_38px_rgba(148,163,184,0.18)]',
    topBar: 'bg-[linear-gradient(90deg,#22C1C3,#4F7CFF,#81A4FF)]',
    avatarFrame: 'border-[#D6DFEE] bg-white shadow-[0_12px_28px_rgba(148,163,184,0.22)]',
    floatingBadge: 'border-[#D3DBFF] bg-[#EEF2FF] shadow-[0_10px_20px_rgba(99,102,241,0.15)]',
    heading: 'text-[#10203A]',
    labelPrimary: 'border-dashed border-[#BFD0EA] bg-[#F2F7FF] text-[#2F5D9A]',
    labelSecondary: 'border-[#CEC4FF] bg-[#F2EEFF] text-[#6943D0]',
    subtext: 'text-[#5B6B82]',
    shareButton: 'border-[#D3DEEE] bg-white text-[#22324A] hover:bg-[#F6F9FF]',
    editButton: 'bg-[linear-gradient(135deg,#C7F0FF,#6A8BFF)] text-[#143166] shadow-[0_12px_28px_rgba(106,139,255,0.24)] hover:brightness-105',
    toggleButton: 'border-[#D7E0EF] bg-white text-[#1D2A3D] hover:bg-[#F5F8FF]',
    statIcon: 'border-[#D7E0EF] bg-[#F7FAFF] text-[#48607D]',
    badgeBg: 'bg-[#EEF3FA]',
    statValue: 'text-[#13233B]',
    statLabel: 'text-[#68788E]',
    sectionIcon: 'border-[#D7E0EF] bg-[#F7FAFF]',
    sectionTitle: 'text-[#16253F]',
    mutedLabel: 'text-[#6E7D91]',
    heatmapWrapper: 'border-[#DCE5F1] bg-[#FBFDFF]',
    divider: 'border-[#E0E8F3]',
    metricLabel: 'text-[#7A889C]',
    metricValue: 'text-[#13233B]',
    smallTitle: 'text-[#718198]',
    innerCard: 'border-[#DCE5F1] bg-[#FDFEFF]',
    innerIcon: 'border-[#DCE5F1] bg-[#F1F6FD] text-[#1D2A3D]',
    bodyText: 'text-[#24364F]',
    expertiseChip: 'border-[#DCE5F1] bg-[#F5F8FD] text-[#31445D]',
    linkButton: 'text-[#5B67E8] hover:text-[#3647D6]',
    activityCard: 'border-[#DCE5F1] bg-[#FCFDFF]',
    activityIcon: 'border-[#DCE5F1] bg-[#F1F6FD]',
    activityTitle: 'text-[#1C2B42]',
    activitySubtitle: 'text-[#6F7F95]',
    activityTime: 'text-[#728198]',
    accents: ['text-[#C9782C]', 'text-[#3562D7]', 'text-[#D27A10]'],
    tagColors: {
      Production: 'text-[#B66A1E]',
      Review: 'text-[#6755D8]',
      Security: 'text-[#D14A57]',
    },
    activityIconColors: ['text-[#4B63D9]', 'text-[#4B63D9]', 'text-[#D14A57]'],
    heatmap: ['bg-[#E8EEF8]', 'bg-[#C9D8F5]', 'bg-[#9EB9F1]', 'bg-[#7095ED]', 'bg-[#466EF0]'],
  },
}

const baseCardClass = 'rounded-[20px] border'

const Profile = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.theme.mode)
  const theme = themes[mode]

  return (
    <div className={`min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 ${theme.page}`}>
      <div className='mx-auto flex w-full max-w-[1240px] flex-col gap-5'>
        <section className={`${baseCardClass} overflow-hidden transition-colors duration-300 ${theme.card}`}>
          <div className={`h-1 w-full ${theme.topBar}`} />

          <div className='flex flex-col gap-6 p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6'>
            <div className='flex flex-col gap-5 md:flex-row md:items-center'>
              <div className='relative w-fit'>
                <div className={`rounded-[18px] border p-1.5 transition-colors duration-300 ${theme.avatarFrame}`}>
                  <img
                    width={160}
                    src={alex}
                    alt='Alex Monolith avatar'
                    className='h-[132px] w-[104px] rounded-[14px] object-cover sm:h-[150px] sm:w-[118px]'
                  />
                </div>
                <div className={`absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition-colors duration-300 ${theme.floatingBadge}`}>
                  <img src={icon} alt='icon' />
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex flex-col gap-3 xl:flex-row xl:items-center'>
                  <h1 className={`max-w-[260px] text-[38px] leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-[52px] ${theme.heading}`}>
                    Alex Monolith
                  </h1>

                  <div className='flex flex-wrap gap-2'>
                    <span className={`rounded-[6px] border px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] ${theme.labelPrimary}`}>
                      Lead Architect
                    </span>
                    <span className={`rounded-[6px] border px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] ${theme.labelSecondary}`}>
                      Maintainer
                    </span>
                  </div>
                </div>

                <div className={`flex flex-col gap-2 text-[14px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${theme.subtext}`}>
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
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`inline-flex items-center justify-center gap-2 rounded-[10px] border px-5 py-3 text-[14px] font-semibold transition-colors duration-300 ${theme.toggleButton}`}
              >
                {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button className={`inline-flex items-center justify-center gap-3 rounded-[10px] border px-5 py-3 text-[14px] font-medium transition-colors duration-300 ${theme.shareButton}`}>
                <img src={share} alt='share' className='h-4 w-4 opacity-90' />
                Share Profile
              </button>
              <button className={`rounded-[10px] px-5 py-3 text-[14px] font-bold transition ${theme.editButton}`}>
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        <section className='grid gap-4 lg:grid-cols-3'>
          {stats.map((item, index) => (
            <article key={item.label} className={`${baseCardClass} p-5 transition-colors duration-300 ${theme.card}`}>
              <div className='mb-10 flex items-start justify-between gap-3'>
                <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] border text-[15px] transition-colors duration-300 ${theme.statIcon}`}>
                  <img src={item.img} alt='' />
                </div>
                <span className={`rounded-[6px] px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.badgeBg} ${theme.accents[index]}`}>
                  {item.badge}
                </span>
              </div>
              <div className='space-y-1'>
                <div className={`text-[38px] font-extrabold tracking-[-0.04em] ${theme.statValue}`}>{item.value}</div>
                <p className={`text-[14px] ${theme.statLabel}`}>{item.label}</p>
              </div>
            </article>
          ))}
        </section>

        <section className='grid gap-4 xl:grid-cols-[minmax(0,2fr)_320px]'>
          <article className={`${baseCardClass} p-5 transition-colors duration-300 lg:p-6 ${theme.card}`}>
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <div className={`flex h-8 w-8 items-center justify-center rounded-[9px] border text-[13px] transition-colors duration-300 ${theme.sectionIcon}`}>
                  <img src={icon4} alt='icon' />
                </div>
                <h2 className={`text-[20px] font-semibold ${theme.sectionTitle}`}>Contribution Activity</h2>
              </div>

              <div className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] ${theme.mutedLabel}`}>
                <span>Less</span>
                <div className='flex items-center gap-1.5'>
                  {theme.heatmap.map((shade) => (
                    <span key={shade} className={`h-3 w-3 rounded-[3px] ${shade}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            <div className={`grid gap-2 overflow-x-auto rounded-[16px] border p-4 transition-colors duration-300 ${theme.heatmapWrapper}`}>
              {heatmapRows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex min-w-[420px] gap-2'>
                  {row.map((level, cellIndex) => (
                    <span
                      key={`${rowIndex}-${cellIndex}`}
                      className={`h-9 flex-1 rounded-[6px] border border-white/10 ${theme.heatmap[level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className={`mt-6 grid gap-4 border-t pt-5 sm:grid-cols-3 ${theme.divider}`}>
              <div>
                <p className={`mb-1 text-[10px] uppercase tracking-[0.18em] ${theme.metricLabel}`}>Longest Streak</p>
                <p className={`text-[32px] font-bold tracking-[-0.03em] ${theme.metricValue}`}>124 Days</p>
              </div>
              <div>
                <p className={`mb-1 text-[10px] uppercase tracking-[0.18em] ${theme.metricLabel}`}>Total Review Ops</p>
                <p className={`text-[32px] font-bold tracking-[-0.03em] ${theme.metricValue}`}>842</p>
              </div>
              <div>
                <p className={`mb-1 text-[10px] uppercase tracking-[0.18em] ${theme.metricLabel}`}>Public Repos</p>
                <p className={`text-[32px] font-bold tracking-[-0.03em] ${theme.metricValue}`}>34</p>
              </div>
            </div>
          </article>

          <div className='flex flex-col gap-4'>
            <article className={`${baseCardClass} p-5 transition-colors duration-300 ${theme.card}`}>
              <h3 className={`mb-4 text-[13px] uppercase tracking-[0.22em] ${theme.smallTitle}`}>Connected Accounts</h3>
              <div className='space-y-3'>
                {connectedAccounts.map((account) => (
                  <div
                    key={account.name}
                    className={`flex items-center justify-between rounded-[14px] border px-4 py-3 transition-colors duration-300 ${theme.innerCard}`}
                  >
                    <div className='flex items-center gap-3'>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] border text-[14px] font-semibold transition-colors duration-300 ${theme.innerIcon}`}>
                        {account.icon}
                      </div>
                      <span className={`text-[14px] ${theme.bodyText}`}>{account.name}</span>
                    </div>
                    <span className={`text-[16px] ${theme.smallTitle}`}>{'>'}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${baseCardClass} p-5 transition-colors duration-300 ${theme.card}`}>
              <h3 className={`mb-4 text-[13px] uppercase tracking-[0.22em] ${theme.smallTitle}`}>Expertise</h3>
              <div className='flex flex-wrap gap-2'>
                {expertise.map((item) => (
                  <span
                    key={item}
                    className={`rounded-[8px] border px-3 py-2 text-[12px] transition-colors duration-300 ${theme.expertiseChip}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={`${baseCardClass} p-5 transition-colors duration-300 lg:p-6 ${theme.card}`}>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <h2 className={`text-[22px] font-semibold ${theme.sectionTitle}`}>Recent Activity</h2>
            <button className={`text-[13px] font-medium transition-colors duration-300 ${theme.linkButton}`}>View All Log</button>
          </div>

          <div className='space-y-3'>
            {activities.map((activity, index) => (
              <article
                key={activity.title}
                className={`flex flex-col gap-3 rounded-[16px] border px-4 py-4 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between ${theme.activityCard}`}
              >
                <div className='flex items-start gap-4'>
                  <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-[12px] border text-[15px] transition-colors duration-300 ${theme.activityIcon} ${theme.activityIconColors[index]}`}>
                    {index === 0 ? '<>' : index === 1 ? '//' : '!'}
                  </div>
                  <div>
                    <p className={`text-[15px] font-medium ${theme.activityTitle}`}>{activity.title}</p>
                    <p className={`mt-1 text-[13px] ${theme.activitySubtitle}`}>{activity.subtitle}</p>
                  </div>
                </div>

                <div className='text-right sm:min-w-[110px]'>
                  <p className={`text-[12px] ${theme.activityTime}`}>{activity.time}</p>
                  <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${theme.tagColors[activity.tag]}`}>
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
