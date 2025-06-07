import SocialMedia from '../components/SocialMedia';

function Profile() {
  const introLines = [
    "I'm a Learner, Developer and a Thinker.",
    "I'm sometimes behind the camera, capturing life's moments.",
    "Travelling around & See you around!",
    "Bug --> Code --> Debug"
  ];

  return (
    <div className=" flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block relative mb-6">
            <img
              src="/profile.png"
              alt="Rushil Patel"
              className="w-44   rounded-full object-cover shadow-2xl border-2 border-white dark:border-gray-800"
            />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Rushil Bhaveshkumar Patel
          </h1>
          
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2 max-w-3xl mx-auto leading-relaxed">
            Software Developer Intern @{' '}
            <a 
              href='https://www.odoo.com' 
              target='_blank' 
              className="text-[#65435c] dark:text-[#65435c] hover:underline font-semibold"
            >
              Odoo
            </a>
          </p>
          
          <p className="text-lg font-mono text-gray-500 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            {introLines.map((line, index) => (
                  <p key={index} className="text-base lg:text-lg">
                    {line}
                  </p>
            ))}
          </p>
          
          <div className="justify-center flex">
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;