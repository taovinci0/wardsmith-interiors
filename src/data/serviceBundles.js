/**
 * Per-service sections mirroring `single-service.php` until Sanity provides post meta.
 */

import { processIntro as homeProcessIntro, usp, servicesList } from './homePageContent.js'
import { wpMediaUrl } from '../lib/wpAssetBase.js'

const videoUrl = 'https://www.youtube.com/watch?v=DBcc2_0Lj30'

function fourStepImages(mainImage) {
  const base = servicesList.map((s) => s.imageUrl).filter(Boolean)
  return [mainImage, base[1] || mainImage, base[2] || mainImage, base[3] || mainImage]
}

function serviceProcessBlock(title, mainImage) {
  return {
    eyebrow: 'The Process',
    heading: `How We Deliver ${title}`,
    tagline:
      'A successful project begins with listening. Here is how we typically guide your project from first conversation to installation.',
    steps: [
      {
        title: 'Consultation & design',
        description:
          'We visit your home, understand how you live, take measurements, and translate your brief into a clear design direction.',
      },
      {
        title: 'Approvals & scheduling',
        description:
          'You review drawings and finishes, confirm details, and we agree production and installation dates that work for you.',
      },
      {
        title: 'Craft & manufacture',
        description:
          'Your furniture is built in our Essex workshop by experienced joiners, with quality checks at every stage.',
      },
      {
        title: 'Installation & handover',
        description:
          'We install with care, protect your home, and walk you through the finished result so everything feels exactly as planned.',
      },
    ],
    stepImageUrls: fourStepImages(mainImage),
    endCard: {
      heading: 'Your Home\nAwaits.',
      paragraph: 'Ready to start your journey? Let’s discuss your project today.',
      buttonLabel: 'Start Project',
      buttonTo: '/start-your-project',
    },
  }
}

function process2Block(imageUrl) {
  return {
    eyebrow: 'Craftsmanship',
    heading: 'Designed and Built for Real Homes',
    content: `Every commission is drafted in CAD, refined with you, and then brought to life in our workshop. We combine precision machining with hand finishing so junctions, grain flow, and hardware feel considered — not mass-produced.

We coordinate with other trades where needed and plan installation to minimise disruption.`,
    imageUrl,
    videoUrl,
    ctaLabel: 'WATCH OUR PROCESS',
  }
}

function galleryBlock() {
  return {
    eyebrow: 'Portfolio',
    heading: 'Crafted Details',
    paragraph:
      'A selection of recent work showing materiality, proportion, and the level of care we bring to every installation.',
    imageUrls: [
      wpMediaUrl('/wp-content/uploads/2025/12/kitchens.jpg'),
      wpMediaUrl('/wp-content/uploads/2025/12/bedrooms.jpg'),
      wpMediaUrl('/wp-content/uploads/2025/12/home-offices.jpg'),
      wpMediaUrl('/wp-content/uploads/2025/12/media-walls.jpg'),
      wpMediaUrl('/wp-content/uploads/2025/12/tailored-spaces.jpg'),
      wpMediaUrl('/wp-content/uploads/2025/12/kitchens.jpg'),
    ],
  }
}

function serviceCtaBlock() {
  return {
    heading: 'Ready to take the next step?',
    content:
      'Whether you have a clear brief or need guidance to shape your ideas, we are here to help. Start your project with detailed specifications, or book a complimentary consultation.',
    buttonLabel: 'Start Your Project',
    buttonTo: '/start-your-project',
  }
}

function buildBundle(title, mainImage, introHeading, introBody, bodyParagraphs) {
  return {
    bodyParagraphs,
    processIntro: {
      ...homeProcessIntro,
      eyebrow: homeProcessIntro.eyebrow,
      heading: introHeading,
      content: introBody,
      imageUrl: mainImage,
      imageAspectClass: 'aspect-[4/5]',
      videoUrl,
      ctaLabel: 'WATCH OUR PROCESS',
      enableAnimations: false,
    },
    process2: process2Block(mainImage),
    serviceProcessSteps: serviceProcessBlock(title, mainImage),
    serviceUsp: {
      eyebrow: usp.eyebrow,
      heading: usp.heading,
      content: usp.content,
      imageUrl1: usp.imageUrl1,
      imageUrl2: usp.imageUrl2,
      ctaLabel: usp.ctaLabel,
      ctaTo: usp.ctaTo,
    },
    gallery: galleryBlock(),
    serviceCta: serviceCtaBlock(),
  }
}

const bundles = {
  'bespoke-kitchens': buildBundle(
    'Bespoke Kitchens',
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06386-scaled-1.png'),
    'A Bespoke Kitchen Designed for Everyday Living',
    `The kitchen sits at the heart of the home, playing a central role in daily routines, family life, and entertaining. A well-designed kitchen should feel welcoming, practical, and perfectly suited to the way you live.

Our bespoke kitchen designs are created to balance functionality with lasting visual appeal, transforming your space into a kitchen that feels considered, comfortable, and tailored to your lifestyle.`,
    [
      'The kitchen sits at the heart of the home, playing a central role in daily routines, family life, and entertaining. A well-designed kitchen should feel welcoming, practical, and perfectly suited to the way you live.',
      'Our bespoke kitchen designs are created to balance functionality with lasting visual appeal, transforming your space into a kitchen that feels considered, comfortable, and tailored to your lifestyle.',
    ],
  ),
  bedrooms: buildBundle(
    'Bedrooms',
    wpMediaUrl('/wp-content/uploads/2025/12/bedrooms.jpg'),
    'Fitted bedrooms that use every inch of space',
    `Alcoves, eaves, and awkward corners become useful storage when the furniture is drawn to the millimetre.

We help you choose internals — hanging, drawers, lighting — so the room feels calm the moment you open the doors.`,
    [
      'Fitted bedroom furniture makes the most of alcoves, eaves, and awkward angles. We design wardrobes, dressing areas, and bedside storage as one cohesive scheme.',
      'Choose from a wide range of finishes and internal fittings so every item has a place.',
    ],
  ),
  'home-offices': buildBundle(
    'Home Office Furniture',
    wpMediaUrl('/wp-content/uploads/2025/12/home-offices.jpg'),
    'Home offices that support deep work and video calls',
    `Cable management, task lighting, and generous work surfaces are designed in from the start — not bolted on later.

We can integrate printers, AV, and storage behind refined joinery lines so your space feels professional and uncluttered.`,
    [
      'Whether you need a compact desk wall or a full room transformation, we build home offices that support focus and video calls alike.',
      'Cable management, task lighting, and deep work surfaces come as standard in our thinking — not as afterthoughts.',
    ],
  ),
  'tailored-spaces': buildBundle(
    'Tailored Spaces',
    wpMediaUrl('/wp-content/uploads/2025/12/tailored-spaces.jpg'),
    'Bespoke joinery for the spaces other kitchens skip',
    `Boot rooms, under-stair storage, utilities, and awkward voids — we love the projects that need creative thinking.

Every piece is measured, drawn, and built to fit your architecture, not a catalogue module.`,
    [
      'Under-stair storage, boot rooms, utility joinery — tailored spaces are where bespoke furniture shines.',
      'We measure carefully, prototype in CAD, and build in our Essex workshop for a precise fit on site.',
    ],
  ),
  'media-walls': buildBundle(
    'Media Walls',
    wpMediaUrl('/wp-content/uploads/2025/12/media-walls.jpg'),
    'Media walls that hide technology and elevate the room',
    `We balance ventilation, access for servicing, and a refined front face — so your screen and sound system feel integrated, not dominant.

Finishes and proportions are coordinated with your seating plan and lighting scheme.`,
    [
      'Media walls hide technology, manage heat, and create a calm focal point for your living room.',
      'We coordinate with your AV preferences and ensure services are considered before we manufacture.',
    ],
  ),
  'carpentry-services': buildBundle(
    'Carpentry Services',
    wpMediaUrl('/wp-content/uploads/2025/12/tailored-spaces.jpg'),
    'Traditional carpentry with workshop precision',
    `Doors, architraves, bespoke storage, and site carpentry — we bring the same eye for detail as our fitted furniture.

We plan around your programme and collaborate with other trades to keep the site running smoothly.`,
    [
      'From bespoke doors to detailed trim, our carpentry services support larger interior projects with the same precision as our fitted furniture.',
      'Speak to us about schedules, access, and finishes early — we integrate cleanly with your build programme.',
    ],
  ),
}

bundles['bespoke-kitchens'].heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06386-scaled-1.png')
bundles['bespoke-kitchens'].processIntro = {
  ...bundles['bespoke-kitchens'].processIntro,
  eyebrow: 'Kitchen Design & Renovation',
  heading: 'A Bespoke Kitchen Designed for Everyday Living',
  content: `The kitchen sits at the heart of the home, playing a central role in daily routines, family life, and entertaining. A well-designed kitchen should feel welcoming, practical, and perfectly suited to the way you live.

Our bespoke kitchen designs are created to balance functionality with lasting visual appeal, transforming your space into a kitchen that feels considered, comfortable, and tailored to your lifestyle.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Screenshot-2026-01-20-at-12.02.27.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['bespoke-kitchens'].process2 = {
  eyebrow: 'Bespoke Kitchen Design',
  heading: 'Thoughtfully Designed Kitchens, Crafted Around Your Space',
  content: `Every kitchen we design is tailored to the unique character of your home and the people who use it. From layout planning to finishes and features, each element is carefully considered to make the best possible use of the space.

Whether working within a compact footprint or an open-plan setting, our made-to-measure approach allows for complete flexibility - creating kitchens that flow naturally, function effortlessly, and feel cohesive within the wider home.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Screenshot-2026-01-20-at-12.02.35.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['bespoke-kitchens'].serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Kitchen Design & Renovation, Designed Around You',
  tagline:
    'Bespoke traditional kitchens that bring a timeless elegance to your Essex Home. Whether you prefer shaker-style cabinets, warm wood finishes, or intricate detailing, our experts build traditional kitchens that stand the test of time.',
  steps: [
    {
      title: 'Traditional Kitchens',
      description:
        'Bespoke traditional kitchens that bring a timeless elegance to your Essex Home. Whether you prefer shaker-style cabinets, warm wood finishes, or intricate detailing, our experts build traditional kitchens that stand the test of time.',
    },
    {
      title: 'Contemporary Kitchens',
      description:
        'For those who enjoy sleek, minimalist designs, our modern kitchen delivers aesthetically and practically. Clean lines, cutting-edge materials, and innovative technology form the cornerstone of our contemporary kitchen design, perfectly complementing modern living.',
    },
    {
      title: 'Complete Kitchen Renovations',
      description:
        'Overhaul your kitchen into the space you have always dreamed of. From reimagining the layout, upgrading appliances, or adding a bold new design that truly captures who you are, we handle everything from start to finish with your convenience in mind.',
    },
    {
      title: 'Innovative Storage Solutions',
      description:
        'Maximise your kitchen potential with our clever storage solutions, from pull-out larders and corner units to integrated recycling bins and hidden drawers. Remove clutter and enjoy a beautifully organised kitchen that makes time spent there more enjoyable.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Traditional-Kitchen-1-2.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Modern-Kitchen-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Full-Kitchen-Renovation-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Storage-Solutions-1.png'),
  ],
}
bundles['bespoke-kitchens'].gallery = {
  eyebrow: 'gallery',
  heading: 'Our Kitchen Design & Renovation Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex kitchen projects we have worked on. Get inspired. The Ward-Smith Way. Follow us on Instagram to see our latest projects!',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Project-Image-6-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Project-Image-5-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Project-Image-4-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Project-Image-3-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Kitchen-Project-Image-2-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-New-Kitchen-Renovation-1.png'),
  ],
}

bundles.bedrooms.heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/bedroom-header.png')
bundles.bedrooms.processIntro = {
  ...bundles.bedrooms.processIntro,
  eyebrow: 'Custom Bedroom Furniture',
  heading: 'Made-to-Measure Bedroom Furniture',
  content: `Every bedroom should offer more than just a place to sleep; it should reflect the individual character and lifestyle of its users.

We craft made-to-measure bedroom furniture that blends practicality with considered design. Whether creating fitted wardrobes, bespoke bedside tables, or elegant chests of drawers, every piece is designed around the dimensions and style of the space. Tailoring furniture to the home's architecture ensures a seamless fit, and we offer a wide choice of finishes, materials, and detailing to suit both traditional and contemporary interiors.

Every installation focuses on enhancing storage without compromising the feel of the room, creating layouts that maximise every inch while maintaining balance and flow. Our bespoke approach ensures that storage becomes an integrated part of the bedroom's overall aesthetic, allowing each piece to complement the room while offering lasting functionality.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/bedroom-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles.bedrooms.process2 = {
  eyebrow: 'Custom Bedroom Furniture',
  heading: 'Storage Solutions That Combine Practicality with Elegance',
  content: `Storage plays a vital role in creating a calm, organised bedroom, and carefully considered furniture design can significantly affect how a space feels and functions.

Our storage solutions blend seamlessly into the room's design while offering practical, everyday use. From full-height wardrobes to custom shelving and integrated drawers, each piece is made-to-measure to suit the room's proportions and the needs of its occupants. The focus remains on providing generous storage while maintaining a sense of openness and flow within the space.

Carefully chosen finishes, hardware, and internal layouts ensure that the furniture complements the broader aesthetic of the bedroom, whether classic or contemporary. Our approach aims to elevate everyday living, creating furniture that not only meets storage needs but also enhances the home's character, comfort, and beauty.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06329-2-1.jpg'),
  videoUrl: '',
  ctaLabel: '',
}
bundles.bedrooms.serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Bedroom Furniture, Designed Around You',
  tagline:
    'From fitted wardrobes to fully integrated bedroom schemes, every detail is tailored to your home, your needs and your sense of style.',
  steps: [
    {
      title: 'Fitted Wardrobes',
      description:
        'Our bespoke, fitted wardrobes will unlock the potential space in your bedroom, ensuring your bedroom is an organised sanctuary you can retreat to and relax in. Our wardrobes are beautiful inside and out and designed for your storage needs and style. We never compromise when it comes to wasted and unused space. Find out more about how our fitted wardrobes can transform your bedroom and discover the perfect blend of form and function.',
    },
    {
      title: 'Sliding Door Wardrobes',
      description:
        'Create a stunning focal point within your Essex bedroom with one of our sliding door wardrobes. Our sliding doors are made-to-measure to fit the size of your room perfectly and come with integrated soft-close technology for that effortless glide. We have a vast range of designs and colours available, so you are sure to find one that you love.',
    },
    {
      title: 'Walk-in Wardrobes',
      description:
        'If you have the luxury of space, why not go further and create the perfect space to get ready for your day with one of our bespoke walk-in wardrobes? Imagine all of your belongings wonderfully organised into one room so you can live clutter-free.',
    },
    {
      title: 'Matching Bedroom Furniture',
      description:
        'Add to your storage space some free-standing bedroom furniture that perfectly complements your fitted wardrobe colour, style, and design. Bedside tables, chests of drawers, and dressing tables - we do it all.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-Fitted-Wardrobes-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-Sliding-Door-Wardrobes.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/finishing3.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/bedrooms4.png'),
  ],
}
bundles.bedrooms.gallery = {
  eyebrow: 'gallery',
  heading: 'Our Bedroom Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex Bedroom projects we have worked on.\nGet inspired. The Ward-Smith Way.\n\nFollow us on Instagram to see our latest projects!',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Bedroom-Project-Image-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/4-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/WS-Witham-After-2.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06328-2.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06344-2.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06329-2-2.png'),
  ],
}
bundles.bedrooms.serviceCta = {
  heading: 'Book a free design consultation.',
  content:
    'Whether you know what you want or feel overwhelmed by choice, a design consultation can give you confidence in your vision, help solidify your ideas, and uncover new opportunities. Fill out our form to book your free design consultation.',
  buttonLabel: 'Schedule Consultation',
  buttonTo: '/contact',
}

bundles['home-offices'].heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/WS-Home-Office-Furniture-Productivity-1.png')
bundles['home-offices'].processIntro = {
  ...bundles['home-offices'].processIntro,
  eyebrow: 'Home Office Design',
  heading: 'A Home Office Designed to Support the Way You Work',
  content: `Working from home is now part of everyday life, making it more important than ever to have a workspace that supports focus, comfort, and productivity. A well-designed home office helps create clear boundaries between work and home while providing an organised and inspiring environment.

Our bespoke home offices are designed to declutter your space, enhance productivity, and create a professional setting that feels considered, comfortable, and built around your lifestyle.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06298-2-scaled-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['home-offices'].process2 = {
  eyebrow: 'Made-to-Measure Furniture',
  heading: 'Thoughtfully Crafted Furniture, Built Around Your Space',
  content: `Every home is different, which is why we design and build made-to-measure office furniture tailored to your room dimensions and the way you work. From layout planning to integrated storage and cable management, every detail is carefully considered.

Whether it is a dedicated home office or a compact workspace within another room, our bespoke furniture maximises functionality while maintaining a refined, cohesive aesthetic that feels seamless within your home.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/WS-Home-Office-Furniture-Productivity-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['home-offices'].serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Home Office Furniture, Designed Around the Way You Work',
  tagline:
    'From custom-built desks and bookcases to fully integrated storage solutions, every element of your home office is tailored to your space, your working style, and the way you use your home every day.',
  steps: [
    {
      title: 'Bespoke Desks',
      description:
        'Our tailor-made desks are built to fit the space in your home and can include integrated drawers or cupboards to ensure you can work as productively as possible.',
    },
    {
      title: 'Bookcases',
      description:
        'Complete the look of your Essex home office or study room with a tailor-made bookcase display unit. Not only do these units look fantastic, but they are also essential for keeping your books and belongings organised and well-looked after in one place.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/office1.jpg'),
    wpMediaUrl('/wp-content/uploads/2025/12/office2.jpg'),
  ],
}
bundles['home-offices'].gallery = {
  eyebrow: 'gallery',
  heading: 'Our Home Office Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex home office projects we have worked on. Get inspired. The Ward-Smith Way. Follow us on Instagram to see our latest projects!',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/WS-Home-Office-Furniture-Productivity-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06298-2-scaled-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/office2.jpg'),
    wpMediaUrl('/wp-content/uploads/2025/12/office1.jpg'),
  ],
}
bundles['home-offices'].serviceCta = {
  heading: 'Book a free design consultation.',
  content:
    'Whether you know what you want or feel overwhelmed by choice, a design consultation can give you confidence in your vision, help solidify your ideas, and uncover new opportunities. Fill out our form to book your free design consultation.',
  buttonLabel: 'Schedule Consultation',
  buttonTo: '/contact',
}

bundles['tailored-spaces'].heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/WS-media-walls-3-1.png')
bundles['tailored-spaces'].processIntro = {
  ...bundles['tailored-spaces'].processIntro,
  eyebrow: 'Tailored Home Spaces',
  heading: 'Bespoke Solutions for the Spaces That Deserve More',
  content: `Every home has areas that do not quite fit a standard solution, yet play an important role in everyday living. With thoughtful design, these overlooked or awkward spaces can be transformed into practical, beautiful parts of the home.

Our tailored spaces are designed to unlock the full potential of your home, creating purposeful areas that feel considered, comfortable, and seamlessly integrated with your interior.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06333-2-scaled-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['tailored-spaces'].process2 = {
  eyebrow: 'Bespoke Design & Craftsmanship',
  heading: 'Designed to Fit Your Home, Not the Other Way Around',
  content: `At Ward-Smith Interiors, we create made-to-measure solutions crafted around the unique dimensions and character of each space. From initial design through to installation, every detail is carefully considered to ensure a perfect fit.

Whether it is a compact alcove, an unused corner, or a transitional space within the home, our bespoke approach allows us to create designs that balance functionality with refined craftsmanship, enhancing both how the space looks and how it is used day to day.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/WS-media-walls-3-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['tailored-spaces'].serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Tailored Spaces, Designed Around Your Home',
  tagline:
    'From practical storage solutions to inviting seating and feature joinery, we design and build bespoke pieces that transform underused areas into valuable, well-integrated parts of your home.',
  steps: [
    {
      title: 'Alcove Units',
      description:
        'Custom-built alcove units designed to fit seamlessly into your living spaces, offering a balance of storage and open display with a built-in, timeless finish.',
    },
    {
      title: 'Window Seating',
      description:
        'Bespoke window seating that combines comfort and practicality, creating inviting spaces for reading, relaxing, or simply enjoying natural light.',
    },
    {
      title: 'Boot Rooms',
      description:
        'Tailored boot rooms designed to organise coats, shoes, and everyday essentials, helping to keep your home clutter-free and functional from the moment you step inside.',
    },
    {
      title: 'Custom Storage & Joinery',
      description:
        'Made-to-measure storage and joinery solutions for hallways, landings, and other unique areas, designed to maximise space while maintaining a cohesive interior style.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored4-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored5-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-LED-Lighting-1.png'),
  ],
}
bundles['tailored-spaces'].gallery = {
  eyebrow: 'gallery',
  heading: 'Our Tailored Spaces Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex tailored space projects we have worked on. Get inspired. The Ward-Smith Way. Follow us on Instagram to see our latest projects!',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/WS-media-walls-3-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-LED-Lighting-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored5-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored4-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06333-2-scaled-1.png'),
  ],
}
bundles['tailored-spaces'].serviceCta = {
  heading: 'Book a free design consultation.',
  content:
    'Whether you know what you want or feel overwhelmed by choice, a design consultation can give you confidence in your vision, help solidify your ideas, and uncover new opportunities. Fill out our form to book your free design consultation.',
  buttonLabel: 'Schedule Consultation',
  buttonTo: '/contact',
}

bundles['media-walls'].heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Make-a-Statement-1.png')
bundles['media-walls'].processIntro = {
  ...bundles['media-walls'].processIntro,
  eyebrow: 'Media Wall Design',
  heading: 'A Striking Focal Point Designed for Modern Living',
  content: `Our relaxation time is precious, and the living room is often the heart of the home - where families gather, unwind, and spend time together. A well-designed media wall helps bring order, balance, and visual impact to this central space.

Our bespoke media walls are designed to create a strong focal point while improving functionality, allowing your living area to feel organised, calm, and perfectly suited to the way you live.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Media-Walls-Project-Imagery-2-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['media-walls'].process2 = {
  eyebrow: 'Bespoke Media Walls',
  heading: 'Designed to Combine Functionality and Visual Impact',
  content: `Every media wall we create is designed to enhance the space it occupies, carefully balancing aesthetics with everyday practicality. From layout and proportions to materials and finishes, each element is considered to ensure a seamless fit within your home.

Using our made-to-measure approach, we design media walls that conceal cables, house technology neatly, and integrate storage or display features - resulting in a refined, cohesive installation that feels built into the room rather than added on.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Media-Walls-Project-Imagery-4-1-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['media-walls'].serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Media Walls, Designed Around Your Home',
  tagline:
    'From sleek contemporary designs to more traditional feature walls, every media wall is tailored to your space, your style, and how you use your living area, creating a statement feature that is both practical and beautifully crafted.',
  steps: [
    {
      title: 'Custom Media Wall Design',
      description:
        'Individually designed media walls that create a strong focal point while complementing the style and layout of your living space.',
    },
    {
      title: 'Cable & Technology Integration',
      description:
        'Concealed wiring and neatly integrated technology solutions that reduce clutter and create a clean, organised finish.',
    },
    {
      title: 'Built-In Storage & Display',
      description:
        'Made-to-measure cabinetry, shelving, and display areas designed to house media equipment, accessories, and decorative items.',
    },
    {
      title: 'Fireplace & Feature Integration',
      description:
        'The option to incorporate electric fireplaces or feature elements, adding warmth, character, and visual interest to your media wall design.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-No-cable-clutter-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Make-a-Statement-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored3-1.png'),
  ],
}
bundles['media-walls'].gallery = {
  eyebrow: 'gallery',
  heading: 'Our Media Wall Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex media wall projects we have worked on. Get inspired. The Ward-Smith Way. Follow us on Instagram to see our latest projects!',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/tailored3.jpg'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-No-cable-clutter-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored3-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Media-Walls-Project-Imagery-4-1-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Wardsmith-Media-Walls-Project-Imagery-2-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Make-a-Statement-1.png'),
  ],
}
bundles['media-walls'].serviceCta = {
  heading: 'Book a free design consultation.',
  content:
    'Whether you know what you want or feel overwhelmed by choice, a design consultation can give you confidence in your vision, help solidify your ideas, and uncover new opportunities. Fill out our form to book your free design consultation.',
  buttonLabel: 'Schedule Consultation',
  buttonTo: '/contact',
}

bundles['carpentry-services'].heroImageUrl = wpMediaUrl('/wp-content/uploads/2025/12/WS-media-walls-3-1.png')
bundles['carpentry-services'].processIntro = {
  ...bundles['carpentry-services'].processIntro,
  eyebrow: 'Other Carpentry Solutions',
  heading: 'Tailored Carpentry Solutions',
  content: `Not every project fits neatly into a standard category, and many homes require carpentry work specific to their character and needs.

From custom cabinetry and shelving to fitted doors, architraves, and skirting, every detail is crafted with precision so new work integrates naturally with your home.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/tailored4-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['carpentry-services'].process2 = {
  eyebrow: 'Other Carpentry Solutions',
  heading: 'Expert Craftsmanship for Unique Interior Projects',
  content: `Some of a home's most valuable changes come from small, well-executed improvements.

Whether installing bespoke internal doors, adding elegant architraves, or creating fitted cabinetry for alcoves and underused spaces, each project is handled with the same level of care and finish quality.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1.png'),
  videoUrl: '',
  ctaLabel: '',
}
bundles['carpentry-services'].serviceProcessSteps = {
  eyebrow: 'what we do',
  heading: 'Bespoke Essex Carpentry Services',
  tagline:
    'If it is carpentry-related, ask us. Our fitters are skilled and experienced carpenters delivering high-quality work across your home.',
  steps: [
    {
      title: 'Kitchen Installation',
      description:
        'Experienced carpenters for kitchen fitting, coordinated with a premium project-management approach to keep your programme smooth and predictable.',
    },
    {
      title: 'Home Renovation Carpentry',
      description:
        'We work alongside trusted trades to deliver high-end renovation carpentry, from preparation through finishing details.',
    },
    {
      title: 'Second Fix Carpentry',
      description:
        'Skirting, architraves, doors, and finishing touches fitted with precision to elevate the final look and feel of your rooms.',
    },
    {
      title: 'Tailored Joinery',
      description:
        'Made-to-measure solutions for alcoves and awkward spaces, creating practical and visually balanced storage that feels built-in.',
    },
  ],
  stepImageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/tailored5-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06333-2-scaled-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-LED-Lighting-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1.png'),
  ],
}
bundles['carpentry-services'].gallery = {
  eyebrow: 'gallery',
  heading: 'Our Carpentry Projects',
  paragraph:
    'Take a look at some of our best and favourite Essex carpentry projects. Get inspired by practical craftsmanship and refined finishes.',
  imageUrls: [
    wpMediaUrl('/wp-content/uploads/2025/12/tailored4-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/tailored5-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-Alcove-Units-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Ward-smith-LED-Lighting-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06333-2-scaled-1.png'),
    wpMediaUrl('/wp-content/uploads/2025/12/WS-media-walls-3-1.png'),
  ],
}
bundles['carpentry-services'].serviceCta = {
  heading: 'Need specialist carpentry for your home?',
  content:
    'From second-fix detailing to bespoke joinery, we can help scope and deliver your project with care, precision, and clear communication.',
  buttonLabel: 'Get in touch',
  buttonTo: '/contact',
}

export function getServicePageBundle(slug) {
  return bundles[slug] ?? null
}
