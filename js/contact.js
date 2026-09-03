document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Office Locations Data ---------- */
  const officeLocations = [


    {
      stateId: "dl",
      stateName: "Delhi",
      offices: [
                {
          name: "North Delhi",
          zone: "North Zone Office",
          address: "New Delhi, India",
          phone: "+91 12345 67891",
          email: "delhi@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Okhla Enclave",
          zone: "South Zone Office",
          address: "Okhla Enclave, New Delhi, India",
          phone: "+91 12345 67892",
          email: "okhla@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Narela",
          zone: "North Zone Office",
          address: "Narela, New Delhi, India",
          phone: "+91 12345 67893",
          email: "narela@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Wazirpur",
          zone: "North Zone Office",
          address: "Wazirpur, New Delhi, India",
          phone: "+91 12345 67894",
          email: "wazirpur@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        }
      ]
    },

    {
      stateId: "hr",
      stateName: "Haryana",
      offices: [
        {
          name: "Manesar",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Farruknagar",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Jhajjar",
          zone: "North Zone Office",
          address: "Jhajjar, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Panipat",
          zone: "North Zone Office",
          address: "Panipat, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Sonipat",
          zone: "North Zone Office",
          address: "Sonipat, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Kundli",
          zone: "North Zone Office",
          address: "Sonipat, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Sikandarpur",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Sector 69, 70, 71",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Dwarka Expressway",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        },
        {
          name: "Gurugram",
          zone: "North Zone Office",
          address: "Gurugram, India",
          phone: "+91 98765 43210",
          email: "north@ahujainfracore.com",
          hours: "Mon – Sat: 9:00 AM – 6:00 PM"
        }
      ]
    },
    {
  stateId: "ct",
  stateName: "Chhattisgarh",
  offices: [
    {
      name: "Raipur",
      zone: "Central Zone Office",
      address: "Raipur, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "raipur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Bilaspur",
      zone: "Central Zone Office",
      address: "Bilaspur, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "bilaspur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Bhilai",
      zone: "Central Zone Office",
      address: "Bhilai, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "bhilai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Durg",
      zone: "Central Zone Office",
      address: "Durg, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "durg@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Korba",
      zone: "Central Zone Office",
      address: "Korba, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "korba@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Raigarh",
      zone: "Central Zone Office",
      address: "Raigarh, Chhattisgarh, India",
      phone: "+91 12345 00000",
      email: "raigarh@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "ga",
  stateName: "Goa",
  offices: [
    {
      name: "Panaji",
      zone: "West Zone Office",
      address: "Panaji, Goa, India",
      phone: "+91 12345 00000",
      email: "panaji@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Margao",
      zone: "West Zone Office",
      address: "Margao, Goa, India",
      phone: "+91 12345 00000",
      email: "margao@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Vasco da Gama",
      zone: "West Zone Office",
      address: "Vasco da Gama, Goa, India",
      phone: "+91 12345 00000",
      email: "vascodagama@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Mapusa",
      zone: "West Zone Office",
      address: "Mapusa, Goa, India",
      phone: "+91 12345 00000",
      email: "mapusa@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
     {
      name: "Ponda",
      zone: "West Zone Office",
      address: "Ponda, Goa, India",
      phone: "+91 12345 00001",
      email: "ponda@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Coastal Hubs",
      zone: "West Zone Office",
      address: "Coastal Goa, India",
      phone: "+91 12345 00002",
      email: "coastal.goa@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "ka",
  stateName: "Karnataka",
  offices: [
    {
      name: "Bengaluru",
      zone: "South Zone Office",
      address: "Bengaluru, Karnataka, India",
      phone: "+91 12345 00000",
      email: "bengaluru@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Mysuru",
      zone: "South Zone Office",
      address: "Mysuru, Karnataka, India",
      phone: "+91 12345 00000",
      email: "mysuru@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Mangaluru",
      zone: "South Zone Office",
      address: "Mangaluru, Karnataka, India",
      phone: "+91 12345 00000",
      email: "mangaluru@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Hubballi-Dharwad",
      zone: "South Zone Office",
      address: "Hubballi-Dharwad, Karnataka, India",
      phone: "+91 12345 00000",
      email: "hubballidharwad@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Nelamangala",
      zone: "South Zone Office",
      address: "Nelamangala, Karnataka, India",
      phone: "+91 12345 00000",
      email: "nelamangala@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Koramangala",
      zone: "South Zone Office",
      address: "Koramangala, Karnataka, India",
      phone: "+91 12345 00000",
      email: "koramangala@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Vijayapura",
      zone: "South Zone Office",
      address: "Vijayapura, Karnataka, India",
      phone: "+91 12345 00000",
      email: "vijayapura@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Tumakuru",
      zone: "South Zone Office",
      address: "Tumakuru, Karnataka, India",
      phone: "+91 12345 00000",
      email: "tumakuru@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "jh",
  stateName: "Jharkhand",
  offices: [
    {
      name: "Ranchi",
      zone: "East Zone Office",
      address: "Ranchi, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "ranchi@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Dhanbad",
      zone: "East Zone Office",
      address: "Dhanbad, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "dhanbad@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Jamshedpur",
      zone: "East Zone Office",
      address: "Jamshedpur, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "jamshedpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Bokaro",
      zone: "East Zone Office",
      address: "Bokaro, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "bokaro@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Hazaribagh",
      zone: "East Zone Office",
      address: "Hazaribagh, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "hazaribagh@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Deoghar",
      zone: "East Zone Office",
      address: "Deoghar, Jharkhand, India",
      phone: "+91 12345 00000",
      email: "deoghar@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "mp",
  stateName: "Madhya Pradesh",
  offices: [
    {
      name: "Bhopal",
      zone: "Central Zone Office",
      address: "Bhopal, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "bhopal@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Gwalior",
      zone: "Central Zone Office",
      address: "Gwalior, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "gwalior@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Indore",
      zone: "Central Zone Office",
      address: "Indore, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "indore@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Jabalpur",
      zone: "Central Zone Office",
      address: "Jabalpur, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "jabalpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Ujjain",
      zone: "Central Zone Office",
      address: "Ujjain, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "ujjain@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Rewa",
      zone: "Central Zone Office",
      address: "Rewa, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "rewa@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Dewas",
      zone: "Central Zone Office",
      address: "Dewas, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "dewas@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Ratlam",
      zone: "Central Zone Office",
      address: "Ratlam, Madhya Pradesh, India",
      phone: "+91 12345 00000",
      email: "ratlam@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "ml",
  stateName: "Meghalaya",
  offices: [
    {
      name: "Shillong",
      zone: "East Zone Office",
      address: "Shillong, Meghalaya, India",
      phone: "+91 12345 00000",
      email: "shillong@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Tura",
      zone: "East Zone Office",
      address: "Tura, Meghalaya, India",
      phone: "+91 12345 00000",
      email: "tura@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Jowai",
      zone: "East Zone Office",
      address: "Jowai, Meghalaya, India",
      phone: "+91 12345 00000",
      email: "jowai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Nongstoin",
      zone: "East Zone Office",
      address: "Nongstoin, Meghalaya, India",
      phone: "+91 12345 00000",
      email: "nongstoin@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
        {
      name: "Thangskai",
      zone: "East Zone Office",
      address: "Thangskai, Meghalaya, India",
      phone: "+91 12345 00003",
      email: "thangskai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Mendipathar",
      zone: "East Zone Office",
      address: "Mendipathar, Meghalaya, India",
      phone: "+91 12345 00004",
      email: "mendipathar@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Nongpoh",
      zone: "East Zone Office",
      address: "Nongpoh, Meghalaya, India",
      phone: "+91 12345 00005",
      email: "nongpoh@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "ut",
  stateName: "Uttarakhand",
  offices: [
    {
      name: "Dehradun",
      zone: "North Zone Office",
      address: "Dehradun, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "dehradun@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Rishikesh",
      zone: "North Zone Office",
      address: "Rishikesh, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "rishikesh@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Haldwani",
      zone: "North Zone Office",
      address: "Haldwani, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "haldwani@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Rudrapur",
      zone: "North Zone Office",
      address: "Rudrapur, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "rudrapur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Roorkee",
      zone: "North Zone Office",
      address: "Roorkee, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "roorkee@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Haridwar",
      zone: "North Zone Office",
      address: "Haridwar, Uttarakhand, India",
      phone: "+91 12345 00000",
      email: "haridwar@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "wb",
  stateName: "West Bengal",
  offices: [
    {
      name: "Kolkata",
      zone: "East Zone Office",
      address: "Kolkata, West Bengal, India",
      phone: "+91 12345 00000",
      email: "kolkata@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Asansol",
      zone: "East Zone Office",
      address: "Asansol, West Bengal, India",
      phone: "+91 12345 00000",
      email: "asansol@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Siliguri",
      zone: "East Zone Office",
      address: "Siliguri, West Bengal, India",
      phone: "+91 12345 00000",
      email: "siliguri@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Durgapur",
      zone: "East Zone Office",
      address: "Durgapur, West Bengal, India",
      phone: "+91 12345 00000",
      email: "durgapur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Howrah",
      zone: "East Zone Office",
      address: "Howrah, West Bengal, India",
      phone: "+91 12345 00000",
      email: "howrah@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Kharagpur",
      zone: "East Zone Office",
      address: "Kharagpur, West Bengal, India",
      phone: "+91 12345 00000",
      email: "kharagpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "gj",
  stateName: "Gujarat",
  offices: [
    {
      name: "Ahmedabad",
      zone: "West Zone Office",
      address: "Ahmedabad, Gujarat, India",
      phone: "+91 12345 00000",
      email: "ahmedabad@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Rajkot",
      zone: "West Zone Office",
      address: "Rajkot, Gujarat, India",
      phone: "+91 12345 00000",
      email: "rajkot@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Vadodara",
      zone: "West Zone Office",
      address: "Vadodara, Gujarat, India",
      phone: "+91 12345 00000",
      email: "vadodara@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Surat",
      zone: "West Zone Office",
      address: "Surat, Gujarat, India",
      phone: "+91 12345 00000",
      email: "surat@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Gandhinagar",
      zone: "West Zone Office",
      address: "Gandhinagar, Gujarat, India",
      phone: "+91 12345 00000",
      email: "gandhinagar@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Junagadh",
      zone: "West Zone Office",
      address: "Junagadh, Gujarat, India",
      phone: "+91 12345 00000",
      email: "junagadh@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "or",
  stateName: "Odisha",
  offices: [
    {
      name: "Bhubaneswar",
      zone: "East Zone Office",
      address: "Bhubaneswar, Odisha, India",
      phone: "+91 12345 00000",
      email: "bhubaneswar@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Cuttack",
      zone: "East Zone Office",
      address: "Cuttack, Odisha, India",
      phone: "+91 12345 00000",
      email: "cuttack@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Rourkela",
      zone: "East Zone Office",
      address: "Rourkela, Odisha, India",
      phone: "+91 12345 00000",
      email: "rourkela@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Sambalpur",
      zone: "East Zone Office",
      address: "Sambalpur, Odisha, India",
      phone: "+91 12345 00000",
      email: "sambalpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
        {
      name: "Berhampur",
      zone: "East Zone Office",
      address: "Berhampur, Odisha, India",
      phone: "+91 12345 00006",
      email: "berhampur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Angul",
      zone: "East Zone Office",
      address: "Angul, Odisha, India",
      phone: "+91 12345 00007",
      email: "angul@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Jharsuguda",
      zone: "East Zone Office",
      address: "Jharsuguda, Odisha, India",
      phone: "+91 12345 00008",
      email: "jharsuguda@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "hp",
  stateName: "Himachal Pradesh",
  offices: [
    {
      name: "Dharamshala",
      zone: "North Zone Office",
      address: "Dharamshala, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "dharamshala@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Mandi",
      zone: "North Zone Office",
      address: "Mandi, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "mandi@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Baddi",
      zone: "North Zone Office",
      address: "Baddi, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "baddi@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Palampur",
      zone: "North Zone Office",
      address: "Palampur, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "palampur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Chamba",
      zone: "North Zone Office",
      address: "Chamba, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "chamba@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Hamirpur",
      zone: "North Zone Office",
      address: "Hamirpur, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "hamirpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Manali",
      zone: "North Zone Office",
      address: "Manali, Himachal Pradesh, India",
      phone: "+91 12345 00000",
      email: "manali@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
     {
      name: "Paonta Sahib",
      zone: "North Zone Office",
      address: "Paonta Sahib, Himachal Pradesh, India",
      phone: "+91 12345 00009",
      email: "paontasahib@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},

{
  stateId: "mh",
  stateName: "Maharashtra",
  offices: [
    {
      name: "Mumbai",
      zone: "West Zone Office",
      address: "Mumbai, Maharashtra, India",
      phone: "+91 12345 00010",
      email: "mumbai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Pune",
      zone: "West Zone Office",
      address: "Pune, Maharashtra, India",
      phone: "+91 12345 00011",
      email: "pune@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Jalna",
      zone: "West Zone Office",
      address: "Jalna, Maharashtra, India",
      phone: "+91 12345 00012",
      email: "jalna@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Nagpur",
      zone: "West Zone Office",
      address: "Nagpur, Maharashtra, India",
      phone: "+91 12345 00013",
      email: "nagpur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Nashik",
      zone: "West Zone Office",
      address: "Nashik, Maharashtra, India",
      phone: "+91 12345 00014",
      email: "nashik@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Aurangabad",
      zone: "West Zone Office",
      address: "Aurangabad, Maharashtra, India",
      phone: "+91 12345 00015",
      email: "aurangabad@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},
{
  stateId: "sk",
  stateName: "Sikkim",
  offices: [
    {
      name: "Rangpo",
      zone: "East Zone Office",
      address: "Rangpo, Sikkim, India",
      phone: "+91 12345 00016",
      email: "rangpo@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Singtam",
      zone: "East Zone Office",
      address: "Singtam, Sikkim, India",
      phone: "+91 12345 00017",
      email: "singtam@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Gangtok",
      zone: "East Zone Office",
      address: "Gangtok, Sikkim, India",
      phone: "+91 12345 00018",
      email: "gangtok@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Namchi",
      zone: "East Zone Office",
      address: "Namchi, Sikkim, India",
      phone: "+91 12345 00019",
      email: "namchi@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
},

{
  stateId: "tn",
  stateName: "Tamil Nadu",
  offices: [
    {
      name: "Chennai",
      zone: "South Zone Office",
      address: "Chennai, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "chennai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Coimbatore",
      zone: "South Zone Office",
      address: "Coimbatore, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "coimbatore@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Madurai",
      zone: "South Zone Office",
      address: "Madurai, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "madurai@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Tiruchirappalli",
      zone: "South Zone Office",
      address: "Tiruchirappalli, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "tiruchirappalli@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Salem",
      zone: "South Zone Office",
      address: "Salem, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "salem@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    },
    {
      name: "Tiruppur",
      zone: "South Zone Office",
      address: "Tiruppur, Tamil Nadu, India",
      phone: "+91 12345 00000",
      email: "tiruppur@ahujainfracore.com",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM"
    }
  ]
}
  ];


  /* ---------- Interactive Map & Sidebar Interactions ---------- */
  const stateItems = document.querySelectorAll('.state-item');
  const statePaths = document.querySelectorAll('.state-path');
  const mapMarkers = document.querySelectorAll('.map-marker');
  const detailsContainer = document.querySelector('.office-details-container');

  // Renders office details card dynamically with slide-up fade-in transition
  function displayOfficeDetails(stateId, animate = true) {
    const stateData = officeLocations.find(loc => loc.stateId === stateId);
    if (!stateData || !detailsContainer) return;

    let namesHtml = `<div class="office-names-box">`;
    namesHtml += `<span class="office-names-heading">${stateData.stateName} Offices</span>`;
    namesHtml += `<div class="office-names-list">`;
        stateData.offices.forEach(office => {
      namesHtml += `<span class="office-name-pill"><span class="office-name-dot"></span><span class="office-name-text">${office.name}</span></span>`;
    });
    namesHtml += `</div></div>`;

    detailsContainer.innerHTML = namesHtml;

    // Apply minor GSAP animation for content reveal
    if (window.gsap && animate && !reduceMotion) {
      gsap.fromTo('.office-name-pill', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }

  // Activates a specific state in list and highlights paths/markers on the map
  function selectState(stateId, triggerSource = 'list') {
    // 1. Update State List active classes
    stateItems.forEach(item => {
      if (item.dataset.state === stateId) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Highlight SVG Path
    statePaths.forEach(path => {
      if (path.dataset.state === stateId) {
        path.classList.add('active');
      } else {
        path.classList.remove('active');
      }
    });

    // 3. Highlight/Scale Map Marker(s)
    mapMarkers.forEach(marker => {
      if (marker.dataset.state === stateId) {
        marker.classList.add('active');
      } else {
        marker.classList.remove('active');
      }
    });

    // 4. Update the Details Card
    displayOfficeDetails(stateId, triggerSource !== 'load');
  }

  // Add click & keyboard listeners to State List items
  stateItems.forEach(item => {
    const stateId = item.dataset.state;
    item.addEventListener('click', () => {
      selectState(stateId, 'list');
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectState(stateId, 'list');
      }
    });
  });

  // Add click listeners to SVG state boundary paths
  statePaths.forEach(path => {
    const stateId = path.dataset.state;
    path.addEventListener('click', () => {
      // Find if we have office records for this state
      const hasOffice = officeLocations.some(loc => loc.stateId === stateId);
      if (hasOffice) {
        selectState(stateId, 'map');
      }
    });
  });

  // Add click & keyboard listeners to city markers
  mapMarkers.forEach(marker => {
    const stateId = marker.dataset.state;
    marker.addEventListener('click', () => {
      selectState(stateId, 'marker');
    });

    marker.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectState(stateId, 'marker');
      }
    });
  });

  // Initialize with Delhi state active
  selectState('dl', 'load');

  /* ---------- GSAP Animations Setup ---------- */
  if (window.gsap) {
    // 1. Hero background fade-in & scale reveal
    gsap.fromTo('.contact-hero-bg', 
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    // 2. Hero content element reveals
    gsap.from('.contact-hero-content > *', {
      y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.15
    });

    // 3. Staggered reveals on scroll (Trust & Locations sections)
    if (window.ScrollTrigger && !reduceMotion) {
      // Trust strip reveal
      gsap.from('.trust-item', {
        y: 26, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-grid', start: 'top 85%' }
      });

      // Locations section entrance triggers
      gsap.from('.states-list .state-item', {
        x: -20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.locations-container', start: 'top 85%' }
      });

      gsap.from('.map-wrapper', {
        scale: 0.96, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.locations-container', start: 'top 80%' }
      });

      gsap.from('.map-marker', {
        scale: 0, opacity: 0, stagger: 0.06, duration: 0.45, delay: 0.35, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.locations-container', start: 'top 80%' }
      });
    }
  }

  /* ---------- Contact form validation & submitting ---------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        successMsg.classList.remove('show');
        return;
      }
      successMsg.classList.add('show');
      form.reset();

      window.setTimeout(() => {
        successMsg.classList.remove('show');
      }, 6000);
    });
  }
});
