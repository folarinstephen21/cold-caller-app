"use client";

import React, { useMemo, useState } from "react";
import { getTransition } from "@/helpers/helper";

type ViewMode = "main" | "discovery" | "handoff" | "objection";

type FormDataType = {
  currentCoverage: boolean;
  hospitalised: boolean;
  terminal_illness: boolean;
  doctor_confirm: boolean;
  married: boolean;
  kids: number;
};

type BooleanKeys = "hospitalised" | "terminal_illness" | "doctor_confirm";

const medicalKeys: BooleanKeys[] = [
  "hospitalised",
  "terminal_illness",
  "doctor_confirm",
];

const InsuranceDashboard = () => {
  const [formData, setFormData] = useState<FormDataType>({
    currentCoverage: false,
    hospitalised: false,
    terminal_illness: false,
    doctor_confirm: false,
    married: false,
    kids: 0,
  });

  const [clientName, setClientName] = useState("");
  const [clientAge, setClientAge] = useState("");
  const [province, setProvince] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [activeScript, setActiveScript] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [selectedMajorObjection, setSelectedMajorObjection] = useState<
    string | null
  >(null);

  const ageNum = parseInt(clientAge) || 0;

  const coverageType =
    ageNum >= 50 ? "Final Expense Coverage" : "Family Protection Plans";

  const protectionFocus = useMemo(() => {
    if (formData.kids > 0) return "protect their kids";
    if (formData.married) return "protect their spouse";
    return "protect their family";
  }, [formData]);

  const resetAll = () => {
    setFormData({
      currentCoverage: false,
      hospitalised: false,
      terminal_illness: false,
      doctor_confirm: false,
      married: false,
      kids: 0,
    });

    setClientName("");
    setClientAge("");
    setProvince("");
    setAdvisorName("");
    setViewMode("main");
    setActiveScript(null);
  };

  const allObjections = useMemo(
    () => ({
      "1. Cannot Afford": `
I understand, the economy is not good and a lot of Canadians are struggling to make ends meet! And (client’s name) this is actually exactly why we called you.

Life Insurance is not for wealthy people, it’s for people that need a legacy for their family, a way of protecting them from a financial burden once they are gone.

And here’s what we can do:

We can provide you with a quote that you can save on your mail, and keep it for when you’re ready.

${getTransition()}
`,

      "2. Prices High": `
I completely understand why you might feel like the prices online are too expensive!

Any information that you saw online would be generic/general.

That is why it would be beneficial for you to have a short discussion with one of our senior advisors so that we can provide you with a personalized, proper, and relevant quote based on your needs and budget.

${getTransition()}
`,

      "3. Not Expecting": `
That’s completely understandable!

I’m here to help you get a customized life insurance quote based on your needs and budget which will be much more inexpensive than anything we could’ve sent online.

So to not waste too much of your time..

${getTransition()}
`,

      "4. Voicemail": `
I completely understand your point of view ${clientName || "[Client’s Name]"}! The reason we do not leave voicemails is that—due to the sensitive nature of the information—we want to protect our clients' privacy.${getTransition()}
`,

      "5. No Family": `
${clientName || "[Client’s Name]"} many people feel life insurance is only for those with dependents.

Life insurance can still protect your financial legacy — covering final expenses, paying off debts, or leaving a gift to a cause you care about.

It also locks in low rates now, in case your needs change.

${getTransition()}
`,

      "6. Reviews": `
I completely understand your concern.

Online reviews are an important consideration, and we take customer feedback seriously.

At Specialty Life, we are always striving to improve our services and ensure our clients are well taken care of.

We’d love the opportunity to show you how we prioritize our clients and offer coverage options that truly suit your needs.

So ${clientName || "John"}, let me quickly verify your profile here.

${getTransition()}
`,

      "7. Past Rejection": `
I apologize for that ${clientName || "[Client’s Name]"}.

We offer guaranteed coverage options, and no medical exams are involved in any of our policies.

Even if you've been declined insurance before we still can help get you qualified.

*${getTransition()}
`,

      "8. Recording": `
${clientName || "[Client’s Name]"} I completely understand your point of view and why you would not like the call to be recorded.

Any time your voice is recorded, it’s understandable that there are privacy concerns, especially when you’re recorded talking about personal life and health circumstances.

You can be rest assured that these concerns have been considered.

${getTransition()}
`,

      "9. Provide Info": `
I totally understand and respect your point of view ${clientName || "[Client’s Name]"}.

In order for us to assist you properly today, it would be extremely important to verify these details.

When it comes to life insurance, age and other factors are essential factors so that's why we have to make sure that the information we have on our end is correct.

Thank you for understanding.

${getTransition()}

If they act difficult, do your very best and sound as firm and assertive as possible because if they refuse to verify the date of birth, we cannot transfer them.
`,

      "10. Other Insurance": `
I apologize ${clientName || "[Client’s Name]"}, we don’t offer any of those products.....

However, we do offer affordable life insurance options and with just couple minutes of your time we can present you with a customized quote at no obligation.

We offer a couple different coverage options and we’ll be more than happy to help you choose the solution that cover your needs.

${getTransition()}
`,

      "11. DQ Customer": `
Thank you so much for your interest, however we don’t have any available products for you at this time.

Once we do have, we’ll be more than happy to reach out.

Thank you and do enjoy the rest of your day.
`,

      "12. Provide Price": `
I completely understand that ${clientName || "[Client’s Name]"} and that’s the reason for the call!

Let me complete your profile here so that we can customize the life insurance quote based on your needs and budget.

So to not waste any much of your time -

${getTransition()}
`,

      "13. How Long?": `
Thank you for asking that ${clientName || "[Client’s Name]"}!

It’s going to take as long as you want it to take.

Depending on how many questions you have for the advisor.

`,

      "14. Work Insurance": `
That’s great and this is exactly why I wanted to speak to you, it’s good to have this part covered, but we need to have a plan B in case we switch jobs, or something happens to us and we’re not even aware what our policy covers.

So what we can do for you, is we can customize a free quote for you with all the things you want to be covered for, this way you can check the policy you have and compare whether it really satisfies your needs and whether it will be able to protect your family the way you want to.

${getTransition()}
`,

      "15. Shopping Around": `
I totally understand ${clientName || "John"}, we called to present you some quotes with no obligation at all.

At least you can compare our products with what other companies have to offer.

${getTransition()}
`,

      "16. Providers": `
Our underwriter is Humania.

One of the oldest life insurance companies in Canada.

Has been in business for the past 150 years.

${getTransition()}
`,

      "17. What is this?": `
I understand your concerns ${clientName || "[Client’s Name]"}.

We called you because we realize that a lot of Canadians have no idea that they can save a lot of money by tailoring the policy themselves, including what they need and just excluding what they don’t need from the policy.

Did you know you can customize your own policy?

So all we have to do is… (${getTransition()})

OR

I completely understand ${clientName || "[Client’s Name]"}.

The reason I’m calling is that many Canadians don’t realize they can adjust a policy to fit their needs.

That means removing coverage they do not use, keeping what really matters, and often lowering the cost.

It gives you more control and usually saves money.

To make sure I have the right information for you, let me just confirm a couple of quick details.
`,

      "18. Email Objection": `
Definitely we don’t want to waste your time, and this is why I wanted to have the advisor join, because if we send you an email, it’s going to be a general quote.

Here in SLI we devote special time and attention to all our clients, and we CUSTOMIZE the quotes for them, that way your option ending up being a lot more inexpensive!

${getTransition()}
`,
    }),
    [clientName],
  );

  const majorObjections = {
    "Need Time To Think": `
ACKNOWLEDGE:

${clientName || "(First Name)"}, I completely understand.

A lot of people feel the exact same way at first because life insurance is an important decision.

CHECK:

Usually what clients find helpful is simply reviewing what they qualify for first so they can make an informed decision instead of guessing.

The good news is there’s absolutely no obligation today.

${getTransition()}
`,

    "Already Has Coverage": `
ACKNOWLEDGE:

That’s actually great to hear ${clientName || "(First Name)"}.

A lot of responsible people already have some form of coverage in place.

CHECK:

What many clients discover though, is that policies they got years ago may no longer fully match their current needs or budget.

Sometimes they’re overpaying, underinsured, or missing benefits entirely.

${getTransition()}
`,

    "Need To Speak To Family": `
ACKNOWLEDGE:

I completely understand ${clientName || "(First Name)"}.

Most people like involving their spouse or family in important financial decisions.

CHECK:

What usually helps though is first seeing the actual options available so you have something real to discuss with them instead of just general information.

${getTransition()}
`,

    "Not Interested": `
ACKNOWLEDGE:

I completely understand and honestly most people weren’t expecting our call today.

CHECK:

What we’ve found is that many Canadians simply don’t realize how affordable some customized options can actually be until they review them properly.

That’s really the reason for the call today.

${getTransition()}
`,

    "Busy Right Now": `
ACKNOWLEDGE:

I completely understand ${clientName || "(First Name)"} and I’ll absolutely respect your time.

CHECK:

The good news is this process is actually very quick and we already have an advisor available for ${province || "(Province)"}.

Most people are surprised how easy it is to at least explore their options.

${getTransition()}
`,

    "Too Expensive": `
ACKNOWLEDGE:

I completely understand why you’d feel that way.

CHECK:

That’s actually one of the biggest reasons people speak with our advisors because generic prices online are usually not personalized.

Many clients end up finding options much more affordable than they expected.

${getTransition()}
`,
  };

  const discoveryContent = (
    <div className="space-y-5 animate-in fade-in max-h-[700px] overflow-y-auto pr-2 text-left">
      <div className="border-b border-purple-900 pb-2">
        <p className="text-purple-400 font-black text-[10px] uppercase tracking-[0.2em]">
          💬 DISCOVERY SCRIPT
        </p>

        <p className="text-slate-400 italic text-[10px]">
          WHILE WAITING FOR THE ADVISOR PLEASE USE:
        </p>
      </div>

      {!formData.currentCoverage && (
        <p className="text-xl font-serif italic text-white">
          “👋{" "}
          <span className="text-yellow-400">
            {clientName || "(First Name)"}
          </span>
          , before I connect you with our senior advisor, may I ask if you
          currently have any life insurance in place?”
        </p>
      )}

      {formData.currentCoverage ? (
        <div className="space-y-4 border-l-2 border-blue-500 pl-4 bg-blue-900/20 p-4 rounded-lg">
          <p className="text-blue-400 font-black text-[10px] uppercase tracking-widest">
            IF THEY ALREADY HAVE INSURANCE:
          </p>

          <p className="text-lg font-serif italic">
            “That’s great to hear! 🎉 How long have you had that policy?”
          </p>

          <p className="text-lg font-serif italic text-blue-200">
            “Do you feel it still gives you the protection and peace of mind you
            want today? 🛡”
          </p>

          <p className="text-lg font-serif italic">
            “Are you married or do you have kids? Who would you want to make
            sure is protected most if something ever happened to you? ❤️”
          </p>

          <p className="text-green-300 font-serif italic">
            “Exactly. That’s what this is really about—making sure the people
            you love are taken care of no matter what.”
          </p>
        </div>
      ) : (
        <div className="space-y-4 border-l-2 border-red-500 pl-4 bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-400 font-black text-[10px] uppercase tracking-widest">
            IF THEY DON’T HAVE COVERAGE:
          </p>

          <p className="text-lg font-serif italic">
            “Okay, thank you for sharing that 🙏. A lot of people I speak with
            are in the same boat — they’ve been meaning to take care of it, just
            didn’t know where to start.”
          </p>

          <p className="text-xl font-serif italic text-yellow-200">
            “If something unexpected happened 💭, who would be responsible for
            your final expenses or making sure everything’s handled?”
          </p>
        </div>
      )}

      <div className="border-t border-slate-700 pt-4 space-y-4">
        <p className="text-lg font-serif italic text-white">
          “
          <span className="text-yellow-400">
            {clientName || "(First Name)"}
          </span>
          , almost every parent or spouse I talk to tells me the same thing —
          they just want to make sure their family isn’t left struggling or
          worried when that day comes 💔.”
        </p>

        <p className="text-blue-300 font-bold">
          “It’s about leaving love, not bills.”
        </p>

        <p className="text-lg font-serif italic text-purple-200">
          “I talk with people all across the country 🌎, and even though
          everyone’s story is different, the heart behind it is always the same
          — they want to protect the ones they love ❤️.”
        </p>

        <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">
            💭 OPTIONAL LIGHT NEEDS QUESTIONS
          </p>

          <p className="text-lg font-serif italic text-yellow-100">
            “When that time does come, have you thought about whether you’d
            prefer a traditional burial ⚰️ or cremation 🔥?”
          </p>

          <p className="text-lg font-serif italic text-blue-100">
            “Are there any small debts, loans, or credit cards 💳 you’d want to
            make sure are taken care of?”
          </p>

          <p className="text-lg font-serif italic text-green-100">
            “And would you like to leave a little something extra behind — maybe
            a financial cushion or a small legacy for your loved ones?”
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-4 font-sans text-slate-900">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-blue-800 uppercase italic">
              Master Roleplay v5
            </h1>

            {formData.currentCoverage && (
              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase animate-pulse">
                POLICY IN PLACE
              </div>
            )}
          </div>

          <button
            onClick={resetAll}
            className="bg-red-600 text-white px-4 py-2 rounded font-black text-[10px]"
          >
            RESET
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-4">
            {/* OBJECTION PANEL */}
            <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-orange-500">
              <h2 className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">
                Objection Handling
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(allObjections).map(([key, script]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveScript(script);
                      setViewMode("objection");
                    }}
                    className={`p-2 rounded-lg text-[9px] font-black border min-h-[55px] ${
                      activeScript === script && viewMode === "objection"
                        ? "bg-orange-600 text-white"
                        : "bg-slate-50 hover:bg-orange-50"
                    }`}
                  >
                    {key.split(". ")[1].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* CLIENT PROFILE */}
            <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-blue-600">
              <h2 className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">
                Client Profile
              </h2>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded text-sm font-bold"
                />

                <input
                  type="number"
                  placeholder="Age"
                  value={clientAge}
                  onChange={(e) => setClientAge(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded text-sm font-bold"
                />

                <input
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded text-sm font-bold"
                />

                <input
                  type="text"
                  placeholder="Advisor Name"
                  value={advisorName}
                  onChange={(e) => setAdvisorName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded text-sm font-bold"
                />

                <div className="flex items-center justify-between p-2 bg-slate-50 border rounded">
                  <span className="text-[10px] font-black uppercase">
                    Number of Kids
                  </span>

                  <input
                    type="number"
                    value={formData.kids}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kids: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-14 p-1 border rounded text-center font-bold"
                  />
                </div>

                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border">
                  <input
                    type="checkbox"
                    checked={formData.currentCoverage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentCoverage: e.target.checked,
                      })
                    }
                  />

                  <span className="text-[10px] font-black uppercase">
                    Has Insurance?
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border">
                  <input
                    type="checkbox"
                    checked={formData.married}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        married: e.target.checked,
                      })
                    }
                  />

                  <span className="text-[10px] font-black uppercase">
                    Married?
                  </span>
                </label>

                {medicalKeys.map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded border"
                  >
                    <input
                      type="checkbox"
                      checked={formData[key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [key]: e.target.checked,
                        })
                      }
                    />

                    <span className="text-[10px] font-black uppercase">
                      {key.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT TELEPROMPTER */}
          <div className="lg:col-span-9 bg-slate-900 rounded-xl p-5 md:p-6 shadow-2xl border-b-8 border-blue-800 h-fit max-h-[85vh] overflow-y-auto text-white">
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <button
                onClick={() => setViewMode("main")}
                className={`px-4 py-2 rounded text-[10px] font-black transition ${
                  viewMode === "main"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                🎯 QUALIFIER
              </button>

              <button
                onClick={() => setViewMode("discovery")}
                className={`px-4 py-2 rounded text-[10px] font-black transition ${
                  viewMode === "discovery"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                💬 DISCOVERY
              </button>

              <button
                onClick={() => setViewMode("handoff")}
                className={`px-4 py-2 rounded text-[10px] font-black transition ${
                  viewMode === "handoff"
                    ? "bg-green-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                ☎️ HANDOFF
              </button>

              <button
                onClick={() => setViewMode("objection")}
                className={`px-4 py-2 rounded text-[10px] font-black transition ${
                  viewMode === "objection"
                    ? "bg-orange-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                🛡️ OBJECTIONS
              </button>
            </div>
            {viewMode === "main" && (
              <div className="space-y-4 leading-relaxed">
                <p>
                  Hey{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                  ?
                </p>

                <p>
                  Good morning/Afternoon/Evening{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                </p>

                <p>
                  It’s <span className="text-green-400 font-bold">Stphen</span>{" "}
                  over here with Specialty Life!
                </p>

                <p>
                  We were trying to reach you, so I’m happy we are speaking now
                  — it’s in regards to our new{" "}
                  <span className="text-blue-400 font-bold underline">
                    {coverageType}
                  </span>
                  .
                </p>

                <p>
                  Our main goal is to get you the best option at an affordable
                  rate! but we want to be sure you get the right information,
                </p>

                <p className="italic text-slate-300">
                  Please note that for quality assurance purposes this call may
                  be recorded.
                </p>

                <p>
                  So just to confirm{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                  , you are{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientAge || "___"}
                  </span>{" "}
                  years old?
                </p>

                <p>Wonderful! You sound great for your age!</p>

                <div className="space-y-3 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <p>
                    Most people don’t realize that you need to medically qualify
                    for life insurance. , but we want to be sure you get the
                    right information, so {clientName}
                  </p>

                  <p>You are not currently hospitalized, correct? Wonderful!</p>

                  <p>You are not suffering from a terminal illness? Great!</p>

                  <p>
                    Your doctor has NOT indicated that you have 24 months or
                    less left to live? Fantastic!
                  </p>
                </div>

                <p className="text-green-300">
                  I’m really glad to hear you answering “no” to all those
                  questions.
                </p>

                <p>
                  I speak with a lot of people younger than you who can’t say
                  the same. Great work!
                </p>

                <p>
                  By the way{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                  , you are still a resident of{" "}
                  <span className="text-blue-400 font-bold">
                    {province || "(Province)"}
                  </span>
                  , correct?
                </p>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 space-y-3">
                  <p>
                    We already have one of our advisors for{" "}
                    <span className="text-green-400 font-bold">
                      {province || "(Province)"}
                    </span>{" "}
                    ready to join us.
                  </p>

                  <p>
                    They’ll provide you a free quote and let you know how much
                    benefits you could qualify for.
                  </p>

                  <p>
                    There’s no cost, no obligation, and you could discover some
                    great coverage.
                  </p>

                  <p className="font-bold text-green-300">
                    Let’s get you connected now?
                  </p>
                </div>
              </div>
            )}

            {viewMode === "discovery" && discoveryContent}

            {viewMode === "handoff" && (
              <div className="space-y-5 text-left">
                <p className="text-green-400 font-black uppercase text-xs tracking-widest">
                  🎙 MASTER HANDOFF
                </p>

                <p className="text-xl leading-relaxed">
                  “Hey advisor, I’ve got{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>{" "}
                  on the line from{" "}
                  <span className="text-blue-400 font-bold">
                    {province || "(Province)"}
                  </span>{" "}
                  and they’re looking to{" "}
                  <span className="text-green-300 font-bold">
                    {formData.currentCoverage
                      ? "compare and check what the market has to offer"
                      : protectionFocus}
                  </span>
                  .”
                </p>

                <p className="text-xl">
                  “
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                  , I’m connecting you now with{" "}
                  <span className="text-green-400 font-bold">
                    {advisorName || "(Advisor)"}
                  </span>
                  , one of our top Life Insurance Advisors.”
                </p>

                <p className="text-xl text-green-300">
                  “You’re in great hands!”
                </p>

                <p className="text-xl">
                  “
                  <span className="text-green-400 font-bold">
                    {advisorName || "(Advisor)"}
                  </span>
                  , you’re speaking with{" "}
                  <span className="text-yellow-400 font-bold">
                    {clientName || "(First Name)"}
                  </span>
                  . I’ll let you both take it from here. Wishing you a great
                  call!”
                </p>

                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                  <p className="font-black text-green-300 uppercase">
                    ⏳ WAIT 5 SECONDS
                  </p>

                  <p className="italic text-slate-300 mt-2">
                    Make sure the client and advisor are connected before
                    disconnecting.
                  </p>
                </div>
              </div>
            )}

            {viewMode === "objection" && (
              <div className="flex items-center justify-center h-full">
                <div className="max-w-4xl text-center space-y-6">
                  <p className="text-3xl font-serif italic text-orange-100 leading-relaxed">
                    "{activeScript}"
                  </p>

                  <p className="text-orange-400 font-black uppercase tracking-widest text-xs">
                    ACKNOWLEDGE • CHECK • ENGAGE
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;
