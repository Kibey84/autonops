// Site content for RAG ingestion
// This file contains the text content from all site pages, structured for chunking and embedding

export interface ContentSection {
  page: string;
  url: string;
  title: string;
  section?: string;
  content: string;
}

export const siteContent: ContentSection[] = [
  // ============ HOME PAGE ============
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Hero',
    content: `AutonOps provides professional drone flight operations for emergency response, reconnaissance, and mission-critical applications. We provide pilots, mission controllers, aircraft, and complete mission execution. Our services include Flight Operations, Emergency Response, Reconnaissance, and Mission Support.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Operational Excellence',
    content: `AutonOps is built on discipline, training, and proven processes. Key proof points include: Rapid Deployment with mission-ready teams that mobilize quickly when time is critical. Safety First with rigorous protocols and trained operators for every mission. Mission Planning with detailed pre-mission analysis and coordination with stakeholders. Trained Operators who are professional pilots and mission controllers with operational experience. Secure Data Handling with protected data transmission and storage for sensitive operations.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Services Overview',
    content: `AutonOps services include: Flight Operations providing end-to-end drone flight operations including pilots, mission controllers, and aircraft. Mission Planning with comprehensive pre-mission planning, risk assessment, and stakeholder coordination. Emergency Response with rapid deployment capabilities for fire, rescue, and disaster response scenarios. Reconnaissance providing aerial surveillance and situational awareness for tactical decision-making.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'How We Operate',
    content: `AutonOps follows a structured approach to every mission with four phases: Phase 01 Mission Brief where we define objectives, assess risks, and coordinate with stakeholders. Phase 02 Deploy where we mobilize operators, aircraft, and support equipment to location. Phase 03 Execute where we conduct flight operations with real-time monitoring and communication. Phase 04 Debrief where we deliver data, report findings, and document lessons learned.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: '911 Call to After Action Report Workflow',
    content: `AutonOps mission workflow from 911 Call to After Action Report has 8 steps: Step 01 Emergency Call Received where 911 or dispatch initiates the incident response. Step 02 Request Routed to AutonOps where aerial support request is forwarded to our operations center. Step 03 Mission Planning Initiated where flight routes and sensor configurations are prepared. Step 04 Aircraft Launched with deployment from designated staging area. Step 05 Live Feed to Command where video and sensor data is delivered to Incident Command. Step 06 AI-Assisted Analysis where hotspots, drift zones, and targets of interest are highlighted. Step 07 Commander Directs Operations where the Incident Commander requests adjustments or additional data. Step 08 After-Action Report where mission concludes with AAR delivered to stakeholders.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Incident Command Authority',
    content: `Incident Command Always Retains Control. AutonOps provides situational awareness and aerial intelligence. All tactical decisions remain with the Incident Commander. Our operators follow IC directives and never take autonomous action that affects ground operations. This is a critical safety and compliance requirement.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Aeryl AI Partnership',
    content: `AutonOps partners with Aeryl AI, a leader in edge-computing solutions for real-time wildfire detection. Aeryl's AI-powered sensors enable onboard analysis of thermal imagery, surface temps, and smoke drift, delivering actionable intelligence in seconds rather than minutes. Together, we bridge the gap between cutting-edge detection technology and mission-grade flight operations. Learn more about Aeryl AI at aeryl.base44.app.`,
  },
  {
    page: 'home',
    url: '/',
    title: 'AutonOps Home',
    section: 'Use Cases',
    content: `AutonOps supports critical operations including: Fire Response with aerial assessment of active fires, hotspot identification, and perimeter mapping. Search and Rescue with thermal imaging and visual search across difficult terrain. Reconnaissance providing situational awareness and tactical intelligence gathering. Disaster Assessment with rapid damage evaluation and infrastructure inspection post-event.`,
  },

  // ============ SERVICES PAGE ============
  {
    page: 'services',
    url: '/services',
    title: 'AutonOps Services',
    section: 'Overview',
    content: `AutonOps provides end-to-end drone operations capabilities. We provide the pilots, controllers, aircraft, and expertise so you can focus on your mission objectives. Our services are full-service operations covering everything you need for successful drone operations.`,
  },
  {
    page: 'services',
    url: '/services',
    title: 'AutonOps Services',
    section: 'Mission Categories',
    content: `AutonOps specializes in four mission categories: Fire Response including hotspot identification, perimeter mapping, damage assessment, and real-time fire monitoring. Search and Rescue with thermal imaging, victim location, terrain mapping, and coordination with ground teams. Law Enforcement providing tactical overwatch, scene documentation, suspect tracking, and evidence gathering. Reconnaissance with surveillance, infrastructure inspection, threat detection, and situational awareness.`,
  },
  {
    page: 'services',
    url: '/services#flight-operations',
    title: 'Flight Operations Service',
    section: 'Flight Operations',
    content: `Flight Operations: Complete drone flight operations with professional pilots and mission controllers. Includes FAA-compliant flight operations, experienced remote pilots and visual observers, mission controllers for coordination and oversight, multi-aircraft operations when required, and real-time telemetry and monitoring.`,
  },
  {
    page: 'services',
    url: '/services#mission-planning',
    title: 'Mission Planning Service',
    section: 'Mission Planning',
    content: `Mission Planning: Comprehensive pre-mission planning and risk assessment for successful outcomes. Includes site assessment and airspace analysis, risk identification and mitigation planning, stakeholder coordination and communication, contingency and emergency procedures, and regulatory compliance verification.`,
  },
  {
    page: 'services',
    url: '/services#emergency-response',
    title: 'Emergency Response Service',
    section: 'Emergency Response',
    content: `Emergency Response: Rapid deployment capabilities for time-critical emergency situations with real-time intelligence delivered directly to Incident Command. Includes quick-response team mobilization, live video and sensor feeds to Incident Command, Aeryl AI-powered thermal analysis for hotspot detection, real-time smoke drift and fire behavior monitoring, coordination with first responders and ground teams, and commander-directed flight adjustments on demand.`,
  },
  {
    page: 'services',
    url: '/services#reconnaissance',
    title: 'Reconnaissance Service',
    section: 'Reconnaissance',
    content: `Reconnaissance: Aerial surveillance and intelligence gathering for tactical decision-making. Includes wide-area surveillance coverage, high-resolution imagery capture, live video streaming to command, pattern of life observation, and infrastructure and asset monitoring.`,
  },
  {
    page: 'services',
    url: '/services#equipment',
    title: 'Equipment and Logistics Service',
    section: 'Equipment and Logistics',
    content: `Equipment and Logistics: We bring the aircraft, sensors, and support equipment your mission requires. Includes mission-appropriate aircraft selection, thermal and multispectral sensors, ground control stations, communications equipment, and power and field support gear.`,
  },
  {
    page: 'services',
    url: '/services#data-handling',
    title: 'Data Handling Service',
    section: 'Data Handling',
    content: `Data Handling: Secure capture, transmission, and delivery of mission data. Includes encrypted data transmission, secure storage protocols, chain of custody documentation, multiple delivery format options, and retention and destruction policies.`,
  },

  // ============ TECHNOLOGY PAGE ============
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'M2 Platform Overview',
    content: `AutonOps operates on the Aeryl M2 Multi-Mission Platform, an AI-powered command and control system designed for complex drone operations in emergency response and critical mission environments. The M2 platform provides end-to-end visibility and control across all aspects of drone operations.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'M2 Platform Capabilities',
    content: `M2 Platform Capabilities include: AI-Generated Mission Planning where missions are automatically generated when orders are received, with AI optimizing flight plans, waypoints, and sortie assignments for maximum efficiency. Live Sensor and Video Feeds with real-time streaming of camera feeds directly to incident commanders, with multiple sensor inputs processed simultaneously for comprehensive situational awareness. AI-Enhanced Analysis with onboard and cloud-based AI analyzing sensor data in real-time, identifying hotspots, tracking targets, and highlighting areas of interest automatically. Waypoint Navigation with precise GPS-guided flight paths and automatic waypoint sequencing, where pilots can adjust routes in real-time while maintaining operational safety. Multi-Channel Communications with redundant communication links via satellite Starlink and cellular networks ensuring uninterrupted command and control even in remote locations. Automated Reporting with AI-generated after-action reports, mission scoring, and sortie summaries delivered automatically upon mission completion.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'Mission Workflow',
    content: `The M2 platform automated mission workflow has 8 steps: Step 01 Emergency Call Received where 911 or dispatch initiates the incident response. Step 02 Request Routed to AutonOps where aerial support request is forwarded to our operations center. Step 03 Mission Planning Initiated where flight routes and sensor configurations are prepared by AI. Step 04 Aircraft Launched with deployment from designated staging area. Step 05 Live Feed to Command where video and sensor data is delivered to Incident Command. Step 06 AI-Assisted Analysis where hotspots, drift zones, and targets of interest are highlighted. Step 07 Commander Directs Operations where the Incident Commander requests adjustments or additional data. Step 08 After-Action Report where mission concludes with AAR delivered to stakeholders.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'Command Authority and Safety',
    content: `Command Authority and Safety: AutonOps provides situational awareness and aerial intelligence. All tactical decisions remain with the Incident Commander. Our operators follow IC directives and never take autonomous action that affects ground operations. Key principles include human-supervised operations, IC retains full authority, and no autonomous tactical action.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'Aeryl AI Partnership',
    content: `Technology Partner Aeryl AI: AutonOps partners with Aeryl AI, a leader in edge-computing solutions for real-time wildfire detection. Aeryl's AI-powered sensors enable onboard analysis of thermal imagery, surface temps, and smoke drift, delivering actionable intelligence in seconds rather than minutes. Together, we bridge the gap between cutting-edge detection technology and mission-grade flight operations.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'Integration Capabilities',
    content: `M2 Platform Integration Capabilities include: CRM for client and contact management, order management with automatic mission generation, multi-sortie mission planning, real-time status tracking across all operations, live video conferencing with incident commanders, integrated chat and communication logs, sensor data recording and playback, and mission scoring and performance analytics.`,
  },
  {
    page: 'technology',
    url: '/technology',
    title: 'AutonOps Technology',
    section: 'Aircraft Platform',
    content: `AutonOps aircraft platform includes VTOL (Vertical Take-Off and Landing) aircraft with capabilities including extended flight time for long-duration missions, Starlink connected for remote operation capability, multi-sensor payload with thermal and visual cameras, and GPS waypoint navigation for precision flight paths. Aircraft are pre-positioned at client fire stations for rapid response. Remote pilots operate from Ohio HQ via satellite link, enabling 24/7 mission capability without on-site personnel.`,
  },

  // ============ OPERATIONS PAGE ============
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Overview',
    content: `AutonOps follows a structured, disciplined approach to every mission. From initial planning through final delivery, we follow proven processes that prioritize safety, coordination, and mission success.`,
  },
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Mission Journey',
    content: `The AutonOps mission journey has four phases: Phase 01 Mission Brief where every operation begins with thorough planning and coordination, including defining mission objectives and success criteria, conducting site assessment and airspace analysis, identifying risks and developing mitigation strategies, coordinating with stakeholders and authorities, establishing communication protocols, and briefing all team members on roles and procedures. Phase 02 Deploy where we mobilize personnel and equipment to the operational area, including dispatching operators and support personnel, transporting aircraft and ground equipment, establishing ground control station, verifying communications and data links, conducting pre-flight checks and system tests, and confirming go/no-go criteria. Phase 03 Execute where we conduct flight operations with continuous monitoring and communication, including launching and managing flight operations, maintaining real-time telemetry monitoring, coordinating with ground teams and command, capturing required data and imagery, adapting to changing conditions as needed, and maintaining safety protocols throughout. Phase 04 Debrief where we document outcomes and deliver results to stakeholders, including recovering and securing all equipment, processing and organizing captured data, preparing mission reports and deliverables, conducting after-action review, documenting lessons learned, and archiving data per retention requirements.`,
  },
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Remote Operations Model',
    content: `AutonOps uses a unique remote operations model that provides nationwide coverage from our Ohio operations center. We position aircraft at client locations while pilots operate remotely from our Ohio headquarters via satellite link. This enables rapid response without requiring on-site personnel. Key features include pre-positioned aircraft at client fire stations and facilities for immediate deployment when incidents occur, satellite-linked control via Starlink connectivity enabling reliable remote piloting from Ohio to aircraft anywhere in the country, 24/7 availability with centralized operations enabling round-the-clock mission capability without staffing multiple locations, and scalable coverage where one pilot can support multiple regions scaling efficiently as client base grows.`,
  },
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Safety and Standards',
    content: `Safety is not negotiable at AutonOps. Our operational culture is built on discipline, accountability, and continuous improvement. Safety principles include Safety First where no mission is worth compromising safety and we maintain strict protocols and never pressure operators to fly in unsafe conditions. Risk Management where every mission includes formal risk assessment, identifying hazards early and developing specific mitigation strategies. Continuous Improvement where we learn from every operation with after-action reviews and lessons learned feeding back into our procedures.`,
  },
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Commander-Directed Response',
    content: `Commander-Directed Response: Every AutonOps mission operates under the direction of the Incident Commander. We provide aerial intelligence and situational awareness, but the IC makes all tactical decisions. Key principles include all flight adjustments requested through IC, real-time video and sensor feeds to command post, no autonomous tactical action without IC approval, and integration with existing incident command structure.`,
  },
  {
    page: 'operations',
    url: '/operations',
    title: 'How AutonOps Operates',
    section: 'Mission Planning Excellence',
    content: `Thorough planning is the foundation of successful operations at AutonOps. We invest significant effort in pre-mission preparation to ensure smooth execution. Planning includes airspace analysis to verify airspace class, NOTAMs, TFRs, and any special requirements. Site assessment to evaluate terrain, obstacles, and environmental factors. Stakeholder coordination to align with all parties on objectives, timing, and communication. Contingency planning to develop procedures for equipment failure, weather, and emergencies.`,
  },

  // ============ ABOUT PAGE ============
  {
    page: 'about',
    url: '/about',
    title: 'About AutonOps',
    section: 'Company Overview',
    content: `AutonOps LLP is an Ohio-based drone operations company providing professional flight services for emergency response, reconnaissance, and mission-critical applications. We combine military precision with cutting-edge technology to deliver reliable aerial support when it matters most.`,
  },
  {
    page: 'about',
    url: '/about',
    title: 'About AutonOps',
    section: 'Leadership - Bob Lee',
    content: `Bob Lee, Co-Founder and CEO of AutonOps, brings deep expertise in defense electronics and aerospace innovation. His career spans critical roles at DARPA, Intel, and venture-funded startups, where he specialized in sensor systems, autonomy, and AI-driven platforms. Bob was instrumental in developing defense technologies including electronic warfare systems, advanced robotics, and AI-powered reconnaissance tools. At DARPA, he contributed to programs advancing autonomous systems and intelligent decision-making for national defense. His cross-sector experience from silicon to sensors to systems integration forms the technical foundation of AutonOps' mission capabilities. Bob holds degrees in Computer Engineering and Physics, with advanced coursework in signal processing and machine learning. Contact: bob.lee@autonops.us`,
  },
  {
    page: 'about',
    url: '/about',
    title: 'About AutonOps',
    section: 'Leadership - Matthew B. Sunday',
    content: `Matthew B. Sunday, Co-Founder and COO of AutonOps, brings 30+ years of leadership and operational experience in high-stakes environments. A military veteran and proven business executive, Matt has led teams through complex logistics, compliance, and field operations. His background includes executive leadership, emergency response coordination, and building scalable organizations from the ground up. As COO, Matt ensures flight operations, mission control, and logistics are structured for reliability, scalability, and rapid response. He oversees team readiness, stakeholder coordination, and the operational standards that define AutonOps.`,
  },
  {
    page: 'about',
    url: '/about',
    title: 'About AutonOps',
    section: 'Mission and Values',
    content: `AutonOps Mission: To provide mission-critical aerial operations that support emergency responders and public safety organizations with reliable, professional drone services. Our values include operational excellence with disciplined execution of every mission, safety first with no compromises on safety for any reason, continuous improvement through learning from every operation, and client focus by understanding and meeting client mission requirements.`,
  },
  {
    page: 'about',
    url: '/about',
    title: 'About AutonOps',
    section: 'Government Contracting',
    content: `AutonOps is registered on SAM.gov with a UEI number, making us qualified for federal contracts and grants. We are structured as an Ohio LLP specifically to work with government and enterprise clients.`,
  },

  // ============ FAQ PAGE ============
  {
    page: 'faq',
    url: '/faq',
    title: 'AutonOps FAQ',
    section: 'Services and Capabilities',
    content: `FAQ about AutonOps services and capabilities: Q: What services does AutonOps provide? A: We provide complete drone flight operations including professional pilots, mission controllers, aircraft, and full mission execution. Our services cover fire response, search and rescue, law enforcement support, reconnaissance, and disaster assessment. Q: What types of missions can you support? A: We specialize in four primary mission categories: Fire Response (hotspot identification, perimeter mapping), Search and Rescue (thermal imaging, victim location), Law Enforcement (tactical overwatch, scene documentation), and Reconnaissance (surveillance, infrastructure inspection). Q: Do you provide the aircraft or do we need our own? A: We provide everything including aircraft, sensors, ground control stations, and all support equipment. You do not need to own or maintain any drone equipment to work with us. Q: What areas do you serve? A: We are based in Ohio but serve clients nationwide. Our remote operations model allows us to pre-position aircraft at your location while pilots operate from our Ohio headquarters via satellite link.`,
  },
  {
    page: 'faq',
    url: '/faq',
    title: 'AutonOps FAQ',
    section: 'Technology and Operations',
    content: `FAQ about AutonOps technology and operations: Q: What is the M2 Platform? A: The M2 Multi-Mission Platform is our AI-powered command and control system developed in partnership with Aeryl AI. It handles mission planning, real-time sensor feeds, waypoint navigation, and generates automated after-action reports. Q: How does remote piloting work? A: Aircraft are pre-positioned at client facilities like fire stations. When a mission is needed, our FAA-certified pilots operate the aircraft remotely from our Ohio operations center via Starlink satellite connection, providing 24/7 coverage without requiring on-site personnel. Q: What kind of aircraft do you use? A: We operate VTOL (Vertical Take-Off and Landing) aircraft equipped with thermal and visual cameras, GPS waypoint navigation, and satellite connectivity. Our aircraft are selected based on mission requirements for range, endurance, and payload capacity. Q: How quickly can you respond to an incident? A: With pre-positioned aircraft at your facility, response time is minimal. Once an incident is reported, our system automatically generates a mission plan and notifies available pilots. Aircraft can be airborne within minutes of authorization.`,
  },
  {
    page: 'faq',
    url: '/faq',
    title: 'AutonOps FAQ',
    section: 'Working With Us',
    content: `FAQ about working with AutonOps: Q: How do we get started? A: Contact us to discuss your mission requirements. We will assess your needs, explain our capabilities, and develop a service agreement tailored to your operations. We can arrange a demonstration to show you the M2 platform in action. Q: Do you work with government agencies? A: Yes. AutonOps is registered on SAM.gov with a UEI number, making us qualified for federal contracts and grants. We are structured as an Ohio LLP specifically to work with government and enterprise clients. Q: What certifications do your pilots have? A: All our pilots are FAA Part 107 certified for commercial drone operations. Our team maintains current certifications and undergoes regular training to ensure professional, safe operations. Q: How is pricing structured? A: Pricing depends on your specific requirements including mission frequency, coverage area, equipment needs, and service level. Contact us for a customized quote based on your operational needs.`,
  },
  {
    page: 'faq',
    url: '/faq',
    title: 'AutonOps FAQ',
    section: 'Safety and Compliance',
    content: `FAQ about AutonOps safety and compliance: Q: Who has authority during a mission? A: The Incident Commander retains full authority over all tactical decisions. AutonOps provides aerial intelligence and situational awareness, but we do not direct ground operations or make tactical decisions. All flight adjustments are made at the request of the IC, and our operators follow IC directives throughout the mission. Q: Are your drones fully autonomous? A: No. All AutonOps missions are human-supervised. While our aircraft use AI-assisted analysis to identify hotspots and targets of interest, every flight is controlled by a certified pilot. We never take autonomous tactical action that affects ground operations. The AI supports decision-making; humans remain in control. Q: How do you handle FAA compliance? A: The M2 platform integrates with FAA systems for automated flight plan filing and airspace clearance. We handle all regulatory requirements so you can focus on your mission objectives. Q: What safety protocols do you follow? A: Safety is foundational to our operations. Every mission includes formal risk assessment, pre-flight checks, and contingency planning. We never pressure operators to fly in unsafe conditions, and we maintain strict protocols throughout every operation. Q: What happens if there is an equipment failure? A: Our aircraft have redundant systems and failsafe protocols. The M2 platform monitors all systems in real-time. In case of any anomaly, automated safety procedures activate, and our pilots are trained to handle contingencies.`,
  },

  // ============ INDUSTRIES PAGE ============
  {
    page: 'industries',
    url: '/industries',
    title: 'Industries AutonOps Serves',
    section: 'Overview',
    content: `AutonOps serves organizations that need reliable aerial support for critical operations. We work with fire departments, law enforcement, emergency management, search and rescue teams, and other public safety organizations.`,
  },
  {
    page: 'industries',
    url: '/industries',
    title: 'Industries AutonOps Serves',
    section: 'Fire Departments',
    content: `Fire Department Services: AutonOps provides aerial support for fire departments including wildfire monitoring and hotspot identification, structure fire reconnaissance, post-fire damage assessment, and thermal imaging for search operations. We integrate with incident command systems to provide real-time intelligence during active incidents.`,
  },
  {
    page: 'industries',
    url: '/industries',
    title: 'Industries AutonOps Serves',
    section: 'Law Enforcement',
    content: `Law Enforcement Services: AutonOps provides aerial support for law enforcement including crime scene documentation, tactical overwatch and perimeter security, suspect tracking and surveillance, accident reconstruction, and search operations. Our services are designed to integrate with existing police operations and command structures.`,
  },
  {
    page: 'industries',
    url: '/industries',
    title: 'Industries AutonOps Serves',
    section: 'Emergency Management',
    content: `Emergency Management Services: AutonOps supports emergency management agencies with disaster assessment and damage surveys, flood monitoring, infrastructure inspection, evacuee tracking support, and post-storm reconnaissance. We can rapidly deploy to support emergency operations centers.`,
  },

  // ============ CONTACT PAGE ============
  {
    page: 'contact',
    url: '/contact',
    title: 'Contact AutonOps',
    section: 'Contact Information',
    content: `Contact AutonOps: To discuss your mission requirements or request a capability brief, contact us at bob.lee@autonops.us. We are based in Ohio and serve clients nationwide. Request a capability brief to learn how AutonOps can support your operations.`,
  },
];

// Helper function to get all content as a single array of strings for simple processing
export function getAllContentStrings(): string[] {
  return siteContent.map(section =>
    `${section.title} - ${section.section || 'Overview'}: ${section.content}`
  );
}
