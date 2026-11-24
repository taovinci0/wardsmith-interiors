/**
 * Homepage v4 — Seb's wireframe (Nov 2026), copy as he wrote it.
 * Confirmed by Seb: 3-year workmanship guarantee (materials carry their
 * manufacturers' own guarantees; full T&Cs page to follow), reply within
 * 24 hours, discovery call booked via GoHighLevel calendar on the form.
 * Images below are stand-ins from the existing library until the new
 * photography is shot (captions in the wireframe double as the shot list).
 */

const cdn = (url, w = 1600) => `${url}?auto=format&w=${w}&q=75`

const IMG = {
  kitchenLead: cdn('https://cdn.sanity.io/images/9ryg64p4/production/172bcd662c2d92fa6b8a943f3f30825250623f16-1680x1594.png'),
  kitchenGrey: cdn('https://cdn.sanity.io/images/9ryg64p4/production/8125ae39c6ded093a8ff34b7ddcb9bf49aa8a9a5-1080x1080.png', 1200),
  heroWide: cdn('https://cdn.sanity.io/images/9ryg64p4/production/9bd45d542f1a00b7639f228f81f1761e73aece50-5894x3929.jpg', 2000),
  detail: cdn('https://cdn.sanity.io/images/9ryg64p4/production/a5eb636633084bfbd29b6a5472a0ba3063c7937d-1191x794.jpg', 1200),
  wardrobe: '/wp-content/uploads/2025/12/Copy-of-DSC06298-2-scaled-1-819x1024.png',
  bootRoom: '/wp-content/uploads/2025/12/Copy-of-DSC06328-2-819x1024.png',
  office: '/wp-content/uploads/2025/12/Copy-of-DSC06329-2-1-819x1024.jpg',
  testimonialPoster: '/wp-content/uploads/2025/12/Screenshot-2026-01-21-at-13.00.45.png',
}

export const homeV4 = {
  // Overrides onto the existing full-height photo hero (brandmark intact):
  // Seb's copy, our treatment.
  heroOverride: {
    eyebrow: 'Bespoke kitchens & fitted furniture · Essex',
    heading: 'Bespoke kitchens, made to be lived with.',
    accentPhrase: 'made to be lived with.',
    breakBeforeAccent: true,
    content:
      'Designed around how your household cooks, gathers and gets through the week. Made by our own team at Wicks Manor near Maldon, and fitted by the people who made it.',
    primaryButtonLabel: 'Start a conversation',
    primaryButtonTo: '/contact',
    secondaryButtonLabel: 'See our kitchens',
    secondaryButtonTo: '/kitchens',
  },

  roomsFirst: {
    eyebrow: 'Ward-Smith Interiors',
    heading: 'The rooms you use most deserve the most thought.',
    paragraphs: [
      'The kitchen is where the day starts and, more often than not, where it ends. Breakfast before the school run. Homework at the island. Friends who never quite make it to the sitting room.',
      'We design for that life first. The cabinetry follows.',
    ],
    imageUrl: IMG.kitchenGrey,
    imageCaption: 'Detail — hand-finished cabinetry',
    wideImageUrl: IMG.detail,
  },

  finestWork: {
    eyebrow: 'Bespoke kitchens in Essex',
    heading: 'Kitchens are where we do our finest work.',
    paragraphs: [
      'Every Ward-Smith kitchen begins at your table, not in a catalogue. We look at how you cook, where people gather, what needs hiding away and what deserves to be on show.',
      'Then we look at the house itself. Georgian, Victorian or newly built, the design answers to the house and to you.',
    ],
    linkLabel: 'Explore our kitchens',
    linkTo: '/kitchens',
    imageUrl: IMG.kitchenLead,
  },

  considered: {
    eyebrow: 'Carefully considered design',
    heading: 'Considered down to the last drawer.',
    intro:
      "Good design is mostly decisions you'll never notice, because they simply work. These are a few of the questions we answer before anything is made.",
    items: [
      {
        title: 'Where the day actually happens',
        content:
          'We plan around the way people move through the room: the school-run breakfast, the weekly shop, two cooks at once.',
        imageUrl: IMG.kitchenLead,
      },
      {
        title: 'Storage sized to what it holds',
        content:
          'Drawers and cupboards planned around your pans, plates and appliances, not around standard unit widths.',
        imageUrl: IMG.detail,
      },
      {
        title: 'Light designed with the joinery',
        content:
          'Task, ambient and cabinet lighting drawn into the design from the start, never added as an afterthought.',
        imageUrl: IMG.kitchenGrey,
      },
      {
        title: 'Proportions that belong to the house',
        content:
          'Heights, panel details and island scale taken from the architecture, so the kitchen looks as though it was always there.',
        imageUrl: IMG.heroWide,
      },
    ],
  },

  // Placeholder project — stays bracketed until Seb completes a kitchen
  // caseStudy in the studio; the section hides in production without one.
  featuredProject: {
    eyebrow: 'Featured project · [Town], Essex',
    heading: '[A family kitchen in a Victorian villa]',
    neededLabel: 'What they needed',
    needed:
      "[Two sentences in the household's own terms: who lives there, and what wasn't working.]",
    madeLabel: 'What we made',
    made:
      '[Two sentences on the solution: the island, the larder, the boot room off the back door.]',
    imageUrl: IMG.heroWide,
    details: [
      { caption: '[Detail one: drawer interiors]', imageUrl: IMG.detail },
      { caption: '[Detail two: a practical solution]', imageUrl: IMG.kitchenGrey },
      { caption: '[Detail three: a finish or colour]', imageUrl: IMG.kitchenLead },
    ],
    linkLabel: 'See the full project',
    linkTo: '/projects',
  },

  roomByRoom: {
    eyebrow: 'Beyond the kitchen',
    heading: 'The same care, room by room.',
    intro:
      'The thinking that goes into a good kitchen works just as well in the rest of the house: where things live, how a room is used, and what will still feel right in fifteen years.',
    items: [
      {
        title: 'Dressing rooms & wardrobes',
        content: 'Everything in its place, and mornings a little calmer.',
        imageUrl: IMG.wardrobe,
      },
      {
        title: 'Boot rooms & utilities',
        content: "Where boots, dog leads and the weekly wash stop being everyone's problem.",
        imageUrl: IMG.bootRoom,
      },
      {
        title: 'Home offices & studies',
        content: 'A room that lets you work properly, then close the door on it.',
        imageUrl: IMG.office,
      },
      {
        title: 'Media walls & living rooms',
        content: 'Built-in furniture that makes a room feel finished, with the wires out of sight.',
        imageUrl: IMG.detail,
      },
    ],
    linkLabel: 'Explore the rest of the home',
    linkTo: '/living-spaces',
  },

  promise: {
    eyebrow: 'Our promise',
    heading: 'The standard we keep at home.',
    contentBefore: 'One question sits behind every recommendation we make: ',
    contentItalic: 'would we have it in our own home?',
    contentAfter:
      " It decides the materials we suggest, the details we won't skip, and how we look after your house while we're working in it.",
    linkLabel: 'About Ward-Smith',
    linkTo: '/about-us',
    videoCaption: 'Seb Ward-Smith, founder · 2 min',
    videoUrl: null, // founder film not shot yet — tile shows as a quiet placeholder
    commitmentsHeading: 'Six commitments we make on every project.',
    commitments: [
      {
        title: 'Designed at your table',
        content: 'We come to you, see the house and hear how you live before anything is drawn.',
      },
      {
        title: 'A clear, itemised proposal',
        content: "You'll know exactly what's included, and what it costs, before you commit to anything.",
      },
      {
        title: 'One person, start to finish',
        content: 'The person who designs your kitchen stays with your project until the final fit.',
      },
      {
        title: 'Made by our own team',
        content: 'Every piece is made in our workshop at Wicks Manor, near Maldon.',
      },
      {
        title: 'Fitted by the people who made it',
        content: 'The makers install what they built, so nothing is lost between workshop and home.',
      },
      {
        title: 'Your home, respected',
        content: 'Floors and surfaces protected, and the house left tidy at the end of every working day.',
      },
    ],
  },

  guarantee: {
    eyebrow: 'Craftsmanship guarantee',
    years: '3',
    heading: 'If we made it, we stand behind it.',
    content:
      "Everything we make at Wicks Manor is guaranteed for three years' workmanship. If something we made isn't right, we come back and put it right.",
    meta: [
      'Covers: workmanship on joinery, doors, drawers and fittings',
      "Materials: covered by their manufacturers' own guarantees",
    ],
    // "Read the guarantee in full" returns once Seb has written the T&Cs page.
  },

  approach: {
    eyebrow: 'Our approach',
    heading: 'A big decision should never feel like a leap of faith.',
    intro: "You'll know what happens next at every stage, and who to call.",
    imageUrl: IMG.heroWide,
    imageCaption: 'Makers at work, Wicks Manor workshop',
    steps: [
      {
        tag: 'Call',
        title: 'A first conversation',
        content:
          "A relaxed call about your home, your plans and your budget, and an honest view on whether we're the right fit.",
      },
      {
        tag: 'Design',
        title: 'Design at your table',
        content:
          'We visit, measure and listen, then develop drawings and a detailed proposal for you to consider.',
      },
      {
        tag: 'Workshop',
        title: 'Made at Wicks Manor',
        content: 'Once every detail is agreed, our team makes your furniture in our workshop.',
      },
      {
        tag: 'Fitting',
        title: 'Fitted with care',
        content:
          "The people who made it install it, and treat your home with the respect we'd expect in our own.",
      },
      {
        tag: 'Aftercare',
        title: 'Looked after',
        content: "We're still here once the dust sheets are folded away.",
      },
    ],
    ctaLine: 'The whole journey, explained properly.',
    linkLabel: 'See our approach in detail',
    linkTo: '/our-approach',
  },

  testimonialsHead: {
    eyebrow: 'Client stories',
    heading: 'In their words.',
    subheading: 'Homeowners across Essex on what it was really like to work with us.',
  },
  testimonials: [
    {
      id: 'steven',
      name: 'Steven',
      location: 'Billericay, Essex',
      posterImageUrl: 'https://i.ytimg.com/vi/BGBzn6xJRgw/oar2.jpg',
      videoUrl: 'https://youtube.com/shorts/BGBzn6xJRgw',
    },
    {
      id: 'james',
      name: 'James',
      location: 'Witham, Essex',
      posterImageUrl: 'https://i.ytimg.com/vi/g2uby_DMxl4/oar2.jpg',
      videoUrl: 'https://youtube.com/shorts/g2uby_DMxl4',
    },
    {
      id: 'jordan',
      name: 'Jordan',
      location: 'Epping, Essex',
      posterImageUrl: 'https://i.ytimg.com/vi/xeYRpy2_W3A/oar2.jpg',
      videoUrl: 'https://www.youtube.com/shorts/xeYRpy2_W3A',
    },
    {
      id: 'sarah',
      name: 'Sarah',
      location: 'Dunmow, Essex',
      posterImageUrl: 'https://i.ytimg.com/vi/pe9wdi1qcFk/oar2.jpg',
      videoUrl: 'https://youtube.com/shorts/pe9wdi1qcFk',
    },
  ],

  finalCta: {
    heading: 'Tell us about your home.',
    content:
      "Whether you have plans drawn up or simply a sense that a room isn't working, the first step is a conversation. No obligation and no pressure, just an honest view of what's possible.",
    cards: [
      {
        heading: 'Not sure where to start?',
        content: 'A complimentary 20-minute call to talk through your ideas, your house and your budget.',
        buttonLabel: 'Arrange a call',
        // GoHighLevel booking calendar embeds on the contact page; intent
        // preselects the journey until that embed lands.
        to: '/contact?intent=call',
        tone: 'peach',
      },
      {
        heading: 'Already have plans?',
        content: "Send us your drawings and brief, and we'll come back with our thoughts.",
        buttonLabel: 'Send us your plans',
        to: '/contact?intent=plans',
        tone: 'cream',
      },
    ],
    footnote: 'Covering Essex and the surrounding counties. We aim to reply within 24 hours.',
  },
}
