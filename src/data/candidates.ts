import { Candidate, VoteRecord } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    number: 1,
    name: {
      en: 'Dr. Sovannarith Meas',
      km: 'បណ្ឌិត មាស សុវណ្ណារិទ្ធ',
    },
    role: {
      en: 'Civic Technology & Digital Governance Lead',
      km: 'ប្រធានផ្នែកបច្ចេកវិទ្យាពលរដ្ឋ និងអភិបាលកិច្ចឌីជីថល',
    },
    party: {
      en: 'Digital Renewal Alliance',
      km: 'សម្ព័ន្ធនវានុវត្តន៍ឌីជីថល',
    },
    avatar: '/src/assets/images/candidate_sovann_meas_1790871827015.jpg',
    color: '#4f46e5',
    bgLight: 'bg-indigo-50/70 text-indigo-700',
    borderColor: 'border-indigo-600',
    tagline: {
      en: 'Empowering communities through transparent digital public infrastructure.',
      km: 'ពង្រឹងសិទ្ធិអំណាចសហគមន៍ តាមរយៈហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលសាធារណៈប្រកបដោយតម្លាភាព។',
    },
    bio: {
      en: 'Former lead technologist for open data initiatives with 15+ years orchestrating civic platforms across public institutions and universities.',
      km: 'អតីតអ្នកដឹកនាំបច្ចេកវិទ្យាទិន្នន័យបើកចំហរ ដែលមានបទពិសោធន៍ជាង ១៥ ឆ្នាំ ក្នុងការអភិវឌ្ឍប្រព័ន្ធឌីជីថលសាធារណៈសម្រាប់ស្ថាប័នរដ្ឋ និងសាកលវិទ្យាល័យ។',
    },
    manifesto: {
      en: [
        '100% Transparent municipal budget tracking & open procurement',
        'Decentralized citizen participation app for local councils',
        'Civic digital safety and accessible internet hubs for all districts',
      ],
      km: [
        'តាមដានថវិកាសាលាក្រុង ១០០% និងលទ្ធកម្មសាធារណៈបើកចំហ',
        'កម្មវិធីចូលរួមរបស់ពលរដ្ឋសម្រាប់ក្រុមប្រឹក្សាមូលដ្ឋាន',
        'មណ្ឌលអ៊ីនធឺណិតសុវត្ថិភាព និងងាយស្រួលប្រើប្រាស់សម្រាប់គ្រប់ខណ្ឌ',
      ],
    },
    votes: 1428,
  },
  {
    id: 'c2',
    number: 2,
    name: {
      en: 'Elena Vance',
      km: 'លោកស្រី អេលីណា វ៉ាន',
    },
    role: {
      en: 'Community Heritage & Public Health Director',
      km: 'នាយិកាបេតិកភណ្ឌសហគមន៍ និងសុខភាពសាធារណៈ',
    },
    party: {
      en: "People's Cultural Coalition",
      km: 'សម្ព័ន្ធភាពវប្បធម៌ប្រជាជន',
    },
    avatar: '/src/assets/images/candidate_elena_vance_1790871845552.jpg',
    color: '#059669',
    bgLight: 'bg-emerald-50/70 text-emerald-700',
    borderColor: 'border-emerald-600',
    tagline: {
      en: 'Preserving living culture while expanding accessible neighborhood clinics.',
      km: 'អភិរក្សវប្បធម៌រស់រវើក ព្រមទាំងពង្រីកគ្លីនិកសុខភាពសហគមន៍ដែលងាយស្រួលទទួលសេវា។',
    },
    bio: {
      en: 'Dedicated public health organizer and grassroots cultural curator credited with expanding neighborhood maternal health centers and youth art residencies.',
      km: 'អ្នករៀបចំសុខភាពសាធារណៈ និងអ្នកថែរក្សាវប្បធម៌មូលដ្ឋាន ដែលបានកសាងមណ្ឌលសុខភាពមាតានិងទារក និងមជ្ឈមណ្ឌលសិល្បៈយុវជនជាច្រើន។',
    },
    manifesto: {
      en: [
        'Neighborhood health clinics open 7 days a week with zero copays',
        'Revitalize historical arts districts and artisan micro-grants',
        'Clean air buffer zones around primary schools and elder care facilities',
      ],
      km: [
        'គ្លីនិកសុខភាពសហគមន៍បើកបម្រើ ៧ ថ្ងៃក្នុងមួយសប្តាហ៍ឥតគិតថ្លៃ',
        'ស្តារតំបន់សិល្បៈប្រវត្តិសាស្ត្រ និងផ្តល់ជំនួយខ្នាតតូចដល់សិប្បករ',
        'តំបន់ខ្យល់បរិសុទ្ធជុំវិញសាលាបឋមសិក្សា និងមណ្ឌលថែទាំមនុស្សចាស់',
      ],
    },
    votes: 1215,
  },
  {
    id: 'c3',
    number: 3,
    name: {
      en: 'Marcus Thorne',
      km: 'លោក ម៉ាកុស ថន',
    },
    role: {
      en: 'Clean Transit & Sustainable Energy Architect',
      km: 'ស្ថាបត្យករដឹកជញ្ជូនស្អាត និងថាមពលចីរភាព',
    },
    party: {
      en: 'Sustainable Progress Movement',
      km: 'ចលនាវឌ្ឍនភាពចីរភាព',
    },
    avatar: '/src/assets/images/candidate_marcus_thorne_1790871864957.jpg',
    color: '#0284c7',
    bgLight: 'bg-sky-50/70 text-sky-700',
    borderColor: 'border-sky-600',
    tagline: {
      en: 'Reliable, affordable electric transit powered by community solar arrays.',
      km: 'ការដឹកជញ្ជូនអគ្គិសនីគួរឱ្យទុកចិត្ត តម្លៃសមរម្យ ដំណើរការដោយថាមពលពន្លឺព្រះអាទិត្យសហគមន៍។',
    },
    bio: {
      en: 'Civil engineer and renewable grid systems specialist who led regional rapid electric bus transitions and municipal microgrid designs.',
      km: 'វិស្វករបច្ចេកវិទ្យាសំណង់ និងអ្នកឯកទេសបណ្តាញថាមពលកកើតឡើងវិញ ដែលបានដឹកនាំគម្រោងរថយន្តក្រុងអគ្គិសនី និងប្រព័ន្ធថាមពលពន្លឺព្រះអាទិត្យ។',
    },
    manifesto: {
      en: [
        'Fast frequent electric feeder transit connected to regional hubs',
        'Rooftop solar subsidies for low-to-middle income households',
        'Vocational green energy apprentice pipeline for local youth',
      ],
      km: [
        'រថយន្តក្រុងអគ្គិសនីល្បឿនលឿនតភ្ជាប់ទៅកាន់តំបន់កណ្តាល',
        'ការឧបត្ថម្ភថាមពលពន្លឺព្រះអាទិត្យលើដំបូលផ្ទះសម្រាប់ពលរដ្ឋចំណូលមធ្យម',
        'វគ្គបណ្តុះបណ្តាលវិជ្ជាជីវៈបច្ចេកវិទ្យាបៃតងសម្រាប់យុវជនក្នុងតំបន់',
      ],
    },
    votes: 980,
  },
  {
    id: 'c4',
    number: 4,
    name: {
      en: 'Bopha Chan',
      km: 'កញ្ញា ចាន់ បុប្ផា',
    },
    role: {
      en: 'Youth Innovation & STEM Education Advocate',
      km: 'អ្នកតស៊ូមតិដើម្បីនវានុវត្តន៍យុវជន និងការអប់រំ STEM',
    },
    party: {
      en: 'Future Horizons Initiative',
      km: 'គំនិតផ្តួចផ្តើមអនាគតយុវជន',
    },
    avatar: '/src/assets/images/candidate_bopha_chan_1790871879194.jpg',
    color: '#d97706',
    bgLight: 'bg-amber-50/70 text-amber-700',
    borderColor: 'border-amber-600',
    tagline: {
      en: 'Preparing our next generation with robotics, AI literacy, and creative entrepreneurship.',
      km: 'រៀបចំយុវជនជំនាន់ក្រោយរបស់យើងជាមួយជំនាញរ៉ូបូត ចំណេះដឹង AI និងសហគ្រិនភាពច្នៃប្រឌិត។',
    },
    bio: {
      en: 'Tech founder and educator who built STEM mentorship programs serving over 40,000 students across suburban and rural schools.',
      km: 'ស្ថាបនិកបច្ចេកវិទ្យា និងអ្នកអប់រំដែលបានបង្កើតកម្មវិធីបណ្តុះបណ្តាល STEM សម្រាប់សិស្សជាង ៤០,០០០ នាក់នៅទូទាំងខេត្ត និងរាជធានី។',
    },
    manifesto: {
      en: [
        'Modern maker-labs and coding academies in every public high school',
        'Zero-interest seed micro-loans for youth-founded civic ventures',
        'Universal internship credit agreements with regional employers',
      ],
      km: [
        'បន្ទប់ពិសោធន៍បច្ចេកវិទ្យា និងសាលាបង្រៀនសរសេរកូដនៅគ្រប់វិទ្យាល័យរដ្ឋ',
        'កម្ចីខ្នាតតូចការប្រាក់ ០% សម្រាប់គម្រោងអាជីវកម្មថ្មីរបស់យុវជន',
        'កិច្ចព្រមព្រៀងកម្មសិក្សាការងារជាមួយនិយោជកក្នុងតំបន់',
      ],
    },
    votes: 1140,
  },
];

export const INITIAL_RECENT_VOTES: VoteRecord[] = [
  {
    id: 'v1',
    ballotHash: 'CV-8931-A7E',
    voterName: 'Channary S.',
    voterId: 'ID-***-4821',
    candidateId: 'c1',
    candidateName: 'Dr. Sovannarith Meas',
    timestamp: Date.now() - 1000 * 42,
    station: 'Station 01 — Central Civic Hall',
    verified: true,
  },
  {
    id: 'v2',
    ballotHash: 'CV-4412-B9D',
    voterName: 'Kosal P.',
    voterId: 'ID-***-9014',
    candidateId: 'c4',
    candidateName: 'Bopha Chan',
    timestamp: Date.now() - 1000 * 95,
    station: 'Station 03 — Innovation District Hub',
    verified: true,
  },
  {
    id: 'v3',
    ballotHash: 'CV-6190-C2X',
    voterName: 'Thavy K.',
    voterId: 'ID-***-1189',
    candidateId: 'c2',
    candidateName: 'Elena Vance',
    timestamp: Date.now() - 1000 * 160,
    station: 'Station 02 — Heritage Center',
    verified: true,
  },
  {
    id: 'v4',
    ballotHash: 'CV-2038-D8R',
    voterName: 'Sokha R.',
    voterId: 'ID-***-7732',
    candidateId: 'c3',
    candidateName: 'Marcus Thorne',
    timestamp: Date.now() - 1000 * 220,
    station: 'Station 04 — Riverside Community Booth',
    verified: true,
  },
  {
    id: 'v5',
    ballotHash: 'CV-7714-E1F',
    voterName: 'Vanna M.',
    voterId: 'ID-***-3341',
    candidateId: 'c1',
    candidateName: 'Dr. Sovannarith Meas',
    timestamp: Date.now() - 1000 * 310,
    station: 'Station 01 — Central Civic Hall',
    verified: true,
  },
];
