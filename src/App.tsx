import { useState } from 'react';
import { Video, Users, CheckSquare, Info, Settings, FileCheck, Film, Trophy, CalendarDays, Award, Loader2 } from 'lucide-react';
import { Input, Select, Textarea, Checkbox, SectionHeader } from './components/FormFields';

export default function App() {
  const [participationType, setParticipationType] = useState('Individual');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('');
  const [camera, setCamera] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Collect all form data using the exactly mapped name attributes
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // You will replace this placeholder with your deployed Google Apps Script Web App URL
    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL || '';

    if (!scriptUrl) {
      console.warn("VITE_APPS_SCRIPT_URL is not set. Simulating a successful submission.");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
      return;
    }

    try {
      // POST stringified JSON. mode 'no-cors' avoids preflight but makes response opaque
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
      });

      // Since response is opaque, we assume success if no network error occurred
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the submission server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-lg p-8 text-center shadow-lg transform transition-all">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Film size={32} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3">Submission Received!</h2>
          <p className="text-stone-600 mb-8">
            Thank you for participating in the Solana Thakurbari Short Film Contest. We will review your entry and contact you soon.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-widest text-sm rounded transition-colors"
          >
            Submit Another Entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-50 text-stone-900 font-sans pb-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-amber-500/10 via-stone-50 to-stone-50 pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 max-w-4xl mx-auto text-center border-b border-stone-200 mb-8">
        <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
          <span className="bg-amber-500 text-black px-2 py-0.5 text-xs font-bold tracking-widest uppercase">Official Selection 2026</span>
          <span className="text-amber-600 text-xs tracking-widest uppercase font-medium">Solana Thakurbari Presents</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-2">
          Short Film Contest 2026
        </h1>
        <p className="text-amber-600 font-serif italic text-xl md:text-2xl mt-4 mb-10 max-w-2xl mx-auto">
          "Virasat ki Kahani, Camera ki Zubani"
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 p-4">
            <Trophy className="text-amber-600 mb-3" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest block mb-1">Total Prize Pool</span>
            <p className="text-stone-600 text-sm">₹1.41 Lakhs + Awards. First prize ₹51,000.</p>
          </div>
          <div className="bg-white border border-stone-200 border-l-4 border-l-stone-400 p-4 shadow-sm">
            <CalendarDays className="text-stone-500 mb-3" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest block mb-1 text-stone-700">Submission Window</span>
            <p className="text-stone-600 text-sm">July 1 - July 8, 2026. Results on July 15.</p>
          </div>
          <div className="bg-white border border-stone-200 border-l-4 border-l-amber-700 p-4 shadow-sm">
            <Award className="text-amber-700 mb-3" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest block mb-1 text-amber-700">Format Rules</span>
            <p className="text-stone-600 text-sm">Landscape only. 130 - 180 seconds duration.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-lg p-6 md:p-10 shadow-xl">
          
          <div className="space-y-12">
            
            {/* Section 1: Participant Info */}
            <section>
              <SectionHeader title="Participant Information" icon={Users} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" name="Full Name" placeholder="Enter your full name" required />
                <Input label="Date of Birth" name="Date of Birth" type="date" required />
                <Select 
                  label="Gender" 
                  name="Gender"
                  defaultValue=""
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                    { label: 'Prefer Not to Say', value: 'Prefer Not to Say' },
                  ]}
                  required
                />
                <Input label="Email Address" name="Email Address" type="email" placeholder="you@example.com" required />
                <Input label="Phone Number (WhatsApp)" name="Phone Number (WhatsApp)" type="tel" placeholder="+91" required />
                <Input label="Aadhaar / Gov ID Number" name="Aadhaar / Gov ID Number" placeholder="Format: XXXX XXXX XXXX" required />
                <div className="md:col-span-2">
                  <Textarea label="Full Residential Address" name="Full Residential Address" placeholder="Enter your complete address" required />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-4">Social Media Handles (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Instagram" name="Instagram" placeholder="@username" />
                  <Input label="YouTube" name="YouTube Social" placeholder="Channel Link" />
                  <Input label="Facebook" name="Facebook" placeholder="Profile Link" />
                  <Input label="Other" name="Other Social Media" placeholder="Platform & Link" />
                </div>
              </div>
            </section>

            {/* Section 2: Team Info */}
            <section>
              <SectionHeader title="Team Information" icon={Users} />
              <div className="mb-6">
                <label className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider block mb-3">Participation Type <span className="text-amber-500">*</span></label>
                <div className="flex flex-wrap gap-4">
                  <label className={`flex items-center gap-2 px-4 py-3 border rounded text-sm cursor-pointer transition-colors ${participationType === 'Individual' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-stone-200 text-stone-700'}`}>
                    <input 
                      type="radio" 
                      name="Participation Type" 
                      value="Individual" 
                      checked={participationType === 'Individual'} 
                      onChange={(e) => setParticipationType(e.target.value)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${participationType === 'Individual' ? 'border-amber-600' : 'border-stone-300'}`}>
                      {participationType === 'Individual' && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
                    </div>
                    Individual
                  </label>
                  <label className={`flex items-center gap-2 px-4 py-3 border rounded text-sm cursor-pointer transition-colors ${participationType === 'Team' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-stone-200 text-stone-700'}`}>
                    <input 
                      type="radio" 
                      name="Participation Type" 
                      value="Team" 
                      checked={participationType === 'Team'} 
                      onChange={(e) => setParticipationType(e.target.value)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${participationType === 'Team' ? 'border-amber-600' : 'border-stone-300'}`}>
                      {participationType === 'Team' && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
                    </div>
                    Team
                  </label>
                </div>
              </div>

              {participationType === 'Team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <Input label="Team Name" name="Team / Project Name" placeholder="Enter team name" required />
                  <Input label="Team Leader Name" name="Team Leader Name" placeholder="Enter leader name" required />
                  <Input label="Total Number of Members" name="Total Number of Members" type="number" min="2" placeholder="e.g., 4" required />
                  <Input label="Leader Aadhaar / Gov ID" name="Leader Aadhaar / Gov ID" placeholder="Format: XXXX XXXX XXXX" required />
                  <div className="md:col-span-2">
                    <Textarea 
                      label="List All Team Members with Roles" 
                      name="Team Members with Roles"
                      placeholder="e.g., Rahul (Director), Priya (Editor), Amit (Cinematographer)" 
                      required 
                    />
                  </div>
                </div>
              )}
              {participationType === 'Individual' && (
                 <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                   <Input label="Project Name" name="Team / Project Name" placeholder="Enter a name for your entry" required />
                 </div>
              )}
            </section>

            {/* Section 4: Video Details */}
            <section>
              <SectionHeader title="Video Submission Details" icon={Video} description="Please ensure your settings match the contest guidelines." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input 
                    label="YouTube Video Link" 
                    name="YouTube Video Link"
                    type="url" 
                    placeholder="https://youtu.be/..." 
                    required 
                  />
                  <p className="text-[11px] text-stone-500 mt-2">Video must be Public or Unlisted.</p>
                </div>
                <div className="md:col-span-2">
                  <Input label="Video Title" name="Video Title" placeholder="Enter video title as it appears on YouTube" required />
                </div>
                <div className="md:col-span-2">
                  <Textarea label="Video Description" name="Video Description" placeholder="Minimum 50 Characters" minLength={50} required />
                </div>
                <div className="md:col-span-2">
                  <Input label="Video Tags" name="Video Tags" placeholder="e.g., ShortFilm, SolanaThakurbari, Heritage" />
                </div>
                
                <Input label="Thumbnail Image Link" name="Thumbnail Image Link" type="url" placeholder="GAuth/Drive Link or Imgur" required />
                <Input label="Total Duration" name="Total Duration" placeholder="Format: 02:45" required />
                
                <Select 
                  label="Language Used" 
                  name="Language Used"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={[
                    { label: 'Hindi', value: 'Hindi' },
                    { label: 'English', value: 'English' },
                    { label: 'Bhojpuri', value: 'Bhojpuri' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  required
                />
                {language === 'Other' && (
                  <Input label="Specify Language" name="Specify Language" placeholder="Type language here" required />
                )}
                
                <div className="md:col-span-2">
                  <Textarea label="List All Cast & Crew with Roles" name="Cast & Crew with Roles" placeholder="Provide full credits" required />
                </div>
              </div>
            </section>

            {/* Section 5: Technical Specs */}
            <section>
              <SectionHeader title="Technical Specifications" icon={Settings} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select 
                  label="Camera Used" 
                  name="Camera Used"
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  options={[
                    { label: 'Mobile', value: 'Mobile' },
                    { label: 'DSLR', value: 'DSLR' },
                    { label: 'Mirrorless', value: 'Mirrorless' },
                    { label: 'Cinema Camera', value: 'Cinema Camera' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  required
                />
                
                {camera === 'Other' ? (
                  <Input label="Specify Camera" name="Specify Camera" placeholder="Enter camera model" required />
                ) : (
                  <div className="hidden md:block" />
                )}
                
                <Input label="Editing Software Used" name="Editing Software Used" placeholder="e.g., Premiere Pro, DaVinci, CapCut" required />
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider block">Shot in 4K or Higher? <span className="text-amber-500">*</span></label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700 text-sm">
                      <input type="radio" name="Shot in 4K or Higher" value="Yes" required className="accent-amber-500 bg-transparent border-stone-300 w-4 h-4" /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700 text-sm">
                      <input type="radio" name="Shot in 4K or Higher" value="No" className="accent-amber-500 bg-transparent border-stone-300 w-4 h-4" /> No
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider block">Is the Video Color-Graded? <span className="text-amber-500">*</span></label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700 text-sm">
                      <input type="radio" name="Is Color-Graded" value="Yes" required className="accent-amber-500 bg-transparent border-stone-300 w-4 h-4" /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700 text-sm">
                      <input type="radio" name="Is Color-Graded" value="No" className="accent-amber-500 bg-transparent border-stone-300 w-4 h-4" /> No
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Content Guidelines */}
            <section className="bg-stone-50 p-6 rounded-lg border border-stone-200">
              <SectionHeader title="Content Guidelines" icon={CheckSquare} description="Please acknowledge the following mandatory guidelines." />
              <div className="space-y-4">
                <Checkbox label="I have read and agree to all Contest Terms & Conditions." required />
                <Checkbox label="I confirm that my submission is original." required />
                <Checkbox label="I confirm that my content does not violate any copyright laws." required />
                <Checkbox label="I confirm that all actors/participants appearing in the video have provided consent." required />
                <Checkbox label="I agree to follow YouTube Community Guidelines." required />
              </div>
            </section>

            {/* Section 6: Declaration */}
            <section>
              <SectionHeader title="Declaration & Verification" icon={FileCheck} />
              <div className="p-6 bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-500 mb-8 rounded-r-lg">
                <h4 className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-xs mb-3">
                  <Info size={16} /> Important Note
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  Organizers may request Aadhaar/ID Proof, Raw Footage, Editing Project Files, or Shooting Location Proof for verification. Failure to provide documents within 48 hours may result in disqualification.
                </p>
                <div className="space-y-4">
                  <Checkbox label="I hereby declare that all information provided is true and accurate." required />
                  <Checkbox label="I understand that organizers reserve the right to disqualify any entry violating the rules." required />
                  <Checkbox label="I agree to provide additional documentation if requested." required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <Input label="Signature (Type Full Name)" name="Signature" placeholder="Sign here" required />
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider">Date of Submission</label>
                  <input 
                    type="text" 
                    value={new Date().toLocaleDateString('en-GB')} 
                    disabled 
                    className="w-full bg-stone-100 border border-stone-200 rounded px-3 py-2 text-sm text-stone-500 cursor-not-allowed shadow-none" 
                  />
                </div>
              </div>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-[11px] text-stone-500 uppercase tracking-tighter">© 2026 Solana Thakurbari Cultural Committee</p>
            <div className="flex items-center gap-4 w-full md:w-auto">
              {error && <p className="text-red-500 text-sm text-right flex-1">{error}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-widest text-sm rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckSquare size={18} />
                    Submit Masterpiece
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}