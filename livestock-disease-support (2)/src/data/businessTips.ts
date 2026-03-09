export interface BusinessTip {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  icon: string;
}

export const businessTips: BusinessTip[] = [
  {
    id: 'bt1',
    title: 'Cattle Fattening for Maximum Profit',
    category: 'Cattle Fattening',
    summary: 'Learn how to fatten cattle efficiently for better market prices.',
    icon: 'trending-up',
    content: `Cattle fattening (feedlotting) is one of the most profitable livestock enterprises in Zimbabwe. Here's how to maximize your returns:

**Selection of Animals**
- Choose young cattle (18-24 months) with good frame size
- Select animals with good body conformation
- Avoid animals with health problems or poor teeth

**Feeding Program**
- Start with a 7-14 day adaptation period on hay and small amounts of concentrate
- Gradually increase concentrate over 3 weeks
- Target feed: 2.5-3% of body weight per day
- Use locally available feeds: maize meal, cotton seed cake, sunflower cake
- Provide clean water at all times (40-60 litres per day)

**Fattening Period**
- Target 90-120 days for optimal fattening
- Expect weight gain of 0.8-1.2 kg per day
- Monitor body condition regularly
- Target finish weight: 450-550 kg for steers

**Marketing**
- Sell when animals reach optimal condition (fat score 3-4)
- Time sales for peak demand periods (holidays, year-end)
- Consider direct sales to abattoirs for better prices
- Keep records of all costs for profit calculation

**Expected Returns**
- Purchase price: $400-600 per weaner
- Feed costs: $200-300 over fattening period
- Sale price: $800-1200 per finished animal
- Potential profit: $200-400 per animal`
  },
  {
    id: 'bt2',
    title: 'Reducing Livestock Mortality',
    category: 'Mortality Reduction',
    summary: 'Practical strategies to reduce animal deaths on your farm.',
    icon: 'shield',
    content: `Livestock mortality is the biggest threat to farmer profitability. Here are proven strategies to reduce losses:

**Vaccination Program**
- Follow the recommended vaccination calendar strictly
- Never skip or delay vaccinations
- Store vaccines properly (cold chain)
- Keep vaccination records for every animal

**Tick Control**
- Dip or spray cattle weekly during rainy season
- Use strategic dipping during dry season (fortnightly/monthly)
- Check animals for ticks between dipping
- Rotate acaricide types to prevent resistance

**Nutrition Management**
- Provide supplementary feeding during dry season
- Ensure access to mineral licks year-round
- Provide clean, fresh water daily
- Monitor body condition and adjust feeding

**Disease Surveillance**
- Check animals daily for signs of illness
- Isolate sick animals immediately
- Treat diseases early - don't wait
- Keep a basic medicine kit on the farm

**Calf Management**
- Ensure calves receive colostrum within 6 hours of birth
- Protect calves from cold and rain
- Vaccinate calves on schedule
- Wean at appropriate age (6-8 months)

**Record Keeping**
- Record all deaths with dates and suspected causes
- Track disease patterns on your farm
- Use records to improve management decisions`
  },
  {
    id: 'bt3',
    title: 'Feed Optimization on a Budget',
    category: 'Feed Optimization',
    summary: 'How to feed your livestock well without breaking the bank.',
    icon: 'leaf',
    content: `Good nutrition is the foundation of productive livestock farming. Here's how to optimize feeding costs:

**Dry Season Feeding Strategy**
- Stockpile hay during the rainy season
- Use crop residues (maize stover, groundnut haulms)
- Plant drought-resistant fodder crops (lablab, velvet beans)
- Use browse trees (Leucaena, Acacia pods)

**Homemade Protein Lick**
Recipe for 100kg:
- Salt: 25kg
- Dicalcium phosphate: 15kg
- Urea: 10kg (for cattle only - toxic to poultry)
- Maize meal: 30kg
- Molasses: 20kg
Mix thoroughly and provide in covered troughs.

**Mineral Supplementation**
- Provide mineral licks year-round
- Phosphorus is critical in Zimbabwe's soils
- Bone meal or dicalcium phosphate are good sources
- Salt is essential - provide free-choice

**Water Management**
- Clean water increases feed intake by 20-30%
- Cattle need 40-60 litres per day
- Goats need 5-8 litres per day
- Ensure water points are accessible and clean

**Pasture Management**
- Practice rotational grazing
- Rest pastures for 30-60 days between grazing
- Avoid overgrazing - leave 10cm stubble height
- Overseed with improved grass species`
  },
  {
    id: 'bt4',
    title: 'Livestock Record Keeping Made Simple',
    category: 'Record Keeping',
    summary: 'Why and how to keep proper livestock records.',
    icon: 'book',
    content: `Good records are the foundation of profitable farming. Here's what to record and why:

**Essential Records**
1. Animal Inventory: Number, species, breed, age, sex
2. Breeding Records: Mating dates, bull used, calving dates
3. Health Records: Vaccinations, treatments, diseases
4. Financial Records: Purchases, sales, feed costs, medicine costs
5. Production Records: Milk yield, weight gains, egg production

**Why Keep Records?**
- Identify your best and worst performing animals
- Track disease patterns and prevent outbreaks
- Calculate true costs and profits
- Make informed culling decisions
- Access loans and insurance (banks require records)
- Prove ownership in case of theft

**Simple Recording System**
- Use a notebook dedicated to livestock only
- Record date, animal ID, and event for every activity
- Update records weekly at minimum
- Keep records safe and dry
- Use this app to backup your records digitally!

**Key Performance Indicators**
- Calving rate: Target 85%+ 
- Calf mortality: Target below 5%
- Inter-calving period: Target 365 days
- Weaning weight: Target 200kg+ at 7 months`
  },
  {
    id: 'bt5',
    title: 'Breeding Management for Better Herds',
    category: 'Breeding Management',
    summary: 'Improve your herd genetics through smart breeding decisions.',
    icon: 'git-branch',
    content: `Good breeding management can dramatically improve your herd's productivity over time:

**Bull Selection**
- Choose bulls with proven genetics
- Look for good body conformation and temperament
- Test bull fertility before breeding season
- One bull can serve 25-30 cows
- Replace bulls every 3 years to avoid inbreeding

**Breeding Season**
- Limit breeding season to 3 months (December-February in Zimbabwe)
- This ensures concentrated calving for easier management
- Remove bulls after breeding season
- Pregnancy test cows 6-8 weeks after bull removal

**Heifer Management**
- First mating at 2 years or 300kg body weight
- Ensure heifers are well-nourished before mating
- Use smaller, proven bulls for heifers
- Monitor first-calving heifers closely

**Culling Decisions**
- Cull cows that fail to conceive two years in a row
- Cull cows with poor temperament
- Cull cows that produce weak calves
- Cull cows with udder problems
- Replace with better genetics

**Crossbreeding**
- Cross indigenous breeds with exotic for hybrid vigor
- Brahman x Tuli is excellent for Zimbabwe conditions
- Maintain 50% indigenous genetics for disease resistance
- Keep detailed breeding records for all matings`
  },
  {
    id: 'bt6',
    title: 'Market Access Strategies',
    category: 'Market Access',
    summary: 'How to get the best prices for your livestock and products.',
    icon: 'dollar-sign',
    content: `Getting good prices requires planning and market knowledge:

**Know Your Markets**
- Formal markets: Abattoirs, auction floors, feedlots
- Informal markets: Direct sales, community sales
- Niche markets: Organic, grass-fed, ceremonial
- Export markets: Regional trade opportunities

**Timing Your Sales**
- Prices peak during festive seasons (December, Easter)
- Avoid selling during drought when everyone is selling
- Fatten animals before selling for premium prices
- Sell breeding stock during breeding season

**Adding Value**
- Fatten weaners instead of selling thin
- Process hides and skins
- Sell manure to crop farmers
- Offer breeding services with quality bulls

**Building Relationships**
- Develop relationships with regular buyers
- Join farmer groups for collective bargaining
- Attend agricultural shows and field days
- Use social media to market your animals

**Pricing Your Animals**
- Know the current market prices
- Price based on weight, not just visual assessment
- Factor in all production costs
- Don't accept the first offer - negotiate`
  },
  {
    id: 'bt7',
    title: 'Disease Risk Management',
    category: 'Disease Risk',
    summary: 'Proactive strategies to prevent disease outbreaks.',
    icon: 'alert-triangle',
    content: `Prevention is always cheaper than treatment. Here's how to manage disease risks:

**Biosecurity Measures**
- Quarantine new animals for 21 days before mixing
- Control visitor access to livestock areas
- Disinfect equipment between farms
- Maintain farm boundaries and fencing

**Vaccination Strategy**
- Follow the national vaccination calendar
- Keep vaccines in cold chain (2-8°C)
- Use clean needles for each animal
- Record all vaccinations with dates and batch numbers

**Tick Control Program**
- Weekly dipping during rainy season (October-April)
- Strategic dipping during dry season
- Rotate acaricide types annually
- Monitor for tick resistance

**Nutrition and Immunity**
- Well-fed animals resist disease better
- Provide adequate minerals and vitamins
- Reduce stress during handling
- Ensure clean water supply

**Early Warning Signs**
- Reduced feed intake
- Isolation from herd
- Abnormal behavior
- Fever (normal cattle temp: 38.5-39.5°C)
- Unusual discharges
- Lameness

**Emergency Preparedness**
- Keep a basic medicine kit on farm
- Know your nearest veterinarian's contact
- Have transport available for emergencies
- Keep this app updated with disease information`
  },
  {
    id: 'bt8',
    title: 'Goat Farming for Beginners',
    category: 'Goat Farming',
    summary: 'Start a profitable goat enterprise with these essential tips.',
    icon: 'home',
    content: `Goats are excellent livestock for smallholder farmers in Zimbabwe:

**Why Goats?**
- Lower investment than cattle
- Faster reproduction (twins common)
- Adapt well to harsh conditions
- Growing demand for goat meat
- Can browse on rough vegetation

**Getting Started**
- Start with 10-20 does and 1-2 bucks
- Choose indigenous breeds (Mashona goats) for hardiness
- Build simple but predator-proof housing
- Provide browse, hay, and supplementary feed

**Breeding Management**
- Does can breed from 12 months / 25kg
- Gestation period: 150 days (5 months)
- Separate bucks to control breeding
- Target 3 kiddings in 2 years

**Health Management**
- Deworm every 3 months
- Vaccinate against Pulpy Kidney and Orf
- Control ticks and external parasites
- Trim hooves every 2-3 months

**Marketing Goats**
- High demand for ceremonies and cultural events
- Premium prices during festive seasons
- Goat milk has growing market
- Consider value-added products (cheese, soap)`
  }
];

export const tipCategories = [
  'All',
  'Cattle Fattening',
  'Mortality Reduction',
  'Feed Optimization',
  'Record Keeping',
  'Breeding Management',
  'Market Access',
  'Disease Risk',
  'Goat Farming'
];
