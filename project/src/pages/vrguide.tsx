import { CheckCircle2, Info, Navigation } from 'lucide-react';

export default function VrGuide() {
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 mt-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About our <span className="text-airbnb-red">VR Guide</span> tour feature
                    </h1>
                    <p className="text-xl text-gray-600">
                        Step into your next stay before you even arrive
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-airbnb-red/10 to-airbnb-purple/10 px-8 py-10 text-center">
                        <h2 className="text-2xl font-semibold mb-4">
                            🏠✨ Introducing VR Tours on Airbnb!
                        </h2>
                        <p className="text-lg text-gray-700">
                            Experience your stay before you book it. Explore select Airbnb listings like you're actually there — from the comfort of your home.
                        </p>
                    </div>

                    {/* How To Section */}
                    <div className="px-8 py-10 border-b border-gray-100">
                        <h3 className="text-xl font-semibold mb-6 flex items-center">
                            <Navigation className="w-6 h-6 text-airbnb-red mr-2" />
                            How to Try It
                        </h3>
                        <div className="space-y-4">
                            {['Open any "Featured Stays with VR Tours" from the app homepage',
                              'Tap the "Experience in VR Tour" button',
                              'Immerse yourself in a 360° virtual walk-through'
                            ].map((step, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-airbnb-red/10 text-airbnb-red text-sm font-semibold mr-3">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why It Matters Section */}
                    <div className="px-8 py-10">
                        <h3 className="text-xl font-semibold mb-6 flex items-center">
                            <Info className="w-6 h-6 text-airbnb-red mr-2" />
                            Why It Matters
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-airbnb-red mr-3 mt-1" />
                                <p className="text-gray-700">
                                    Build trust and transparency with realistic, interactive views of spaces. No surprises, no hidden angles.
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-airbnb-red mr-3 mt-1" />
                                <p className="text-gray-700">
                                    Hosts can showcase their listings better with high-quality photos and angles, improving VR performance.
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-airbnb-red mr-3 mt-1" />
                                <p className="text-gray-700">
                                    Guests can feel confident in their booking, knowing exactly what to expect.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10 text-lg text-gray-600 italic">
                    With VR Tours, you're not just booking a place — you're stepping into your next adventure before it begins.
                </div>
            </div>
        </div>
    );
}