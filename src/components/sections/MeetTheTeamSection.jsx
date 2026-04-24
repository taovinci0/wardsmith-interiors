import { useRef } from 'react'
import { meetTheTeam } from '../../data/innerPagesContent.js'
import { useSectionReveal } from '../../hooks/useSectionReveal.js'

export function MeetTheTeamSection() {
  const revealRef = useRef(null)
  useSectionReveal(revealRef, 'meetTeam')

  return (
    <section id="meet-the-team-section" className="meet-the-team-section section-padding bg-neutral-100">
      <div className="container-custom">
        <div ref={revealRef} className="meet-the-team-animate mx-auto mb-24 max-w-[720px] text-center">
          <p className="meet-the-team-eyebrow eyebrow eyebrow-spacing text-accent-600">{meetTheTeam.eyebrow}</p>
          <h2 className="meet-the-team-heading heading-to-body-spacing font-serif text-[3rem] text-primary">
            {meetTheTeam.heading}
          </h2>
          <p className="meet-the-team-body font-sans font-light text-neutral-600">{meetTheTeam.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {meetTheTeam.members.map((member) => (
            <div
              key={member.name}
              className="flex h-full flex-col overflow-hidden rounded-[24px] bg-neutral-200"
            >
              {member.imageUrl ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-neutral-300">
                  <span className="font-sans text-neutral-600">Image coming soon</span>
                </div>
              )}
              <div className="flex flex-grow flex-col p-10">
                <h3 className="heading-to-body-spacing font-serif text-primary" style={{ fontSize: '2rem', lineHeight: 1.2 }}>
                  {member.name}
                </h3>
                <p className="eyebrow eyebrow-spacing text-accent-600">{member.role}</p>
                <p className="flex-grow font-sans font-light text-neutral-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
