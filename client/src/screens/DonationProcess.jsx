import React from "react";

const DonationProcess = () => {
  return (
    <div className="container-fluid container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h1>Donation Process</h1>
          <p>
            Donating blood is a simple process that saves lives. The entire
            process from the time you arrive until the time you leave takes
            about an hour. The donation itself is only about 8-10 minutes. The
            donation process is safe and simple. Here’s what to expect when you
            donate blood:
          </p>
          <ul>
            <li>
              Registration: You will be asked to complete a short registration
              form.
            </li>
            <li>
              Health history and mini-physical: A staff member will ask you
              questions about your health history and give you a mini-physical,
              checking your temperature, blood pressure, pulse and hemoglobin to
              ensure that it is safe for you to donate.
            </li>
            <li>
              Donation: The actual blood donation typically takes about 8-10
              minutes. You will sit comfortably in a chair while a phlebotomist,
              or trained medical professional, draws your blood. The whole
              process is sterile and there is no pain.
            </li>
            <li>
              Refreshments: You will be offered a snack and something to drink.
            </li>
            <li>
              Relax: You will be able to relax and read, watch TV or use your
              phone for a few minutes before you leave.
            </li>
          </ul>
        </div>
        <div className="col-md-6 mt-5">
          <img
            src="./images/donation.jpg"
            style={{
              width: "75%",
            }}
          />
        </div>
      </div>

      <div className="row ">
        <div className="col-md-6 mt-5">
          <img src="./images/donation1.jpg" style={{ width: "75%" }} />
        </div>
        <div className="col-md-6 mt-5">
          <h1>Who can donate blood?</h1>
          <p>
            You can donate blood if you are in good health, weigh at least 110
            pounds and are 17 years of age (16 with parental consent in some
            states). Some states have a lower age limit, so check with your
            local blood center. You can donate blood every 56 days (8 weeks).
          </p>
          <p>You can’t donate blood if you:</p>
          <ul>
            <li>Are pregnant or have ever been pregnant.</li>
            <li>Have ever used illegal drugs.</li>
            <li>Have ever tested positive for HIV or hepatitis.</li>
            <li>Have ever been diagnosed with or treated for syphilis.</li>
            <li>Have ever been diagnosed with or treated for cancer.</li>
            <li>
              Have ever been diagnosed with or treated for heart disease, high
              blood pressure or diabetes.
            </li>
            <li>etc.</li>
          </ul>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-12 mt-5">
          <h1>What happens to my blood after I donate?</h1>
          <p>
            Your blood will be separated into components: red cells, plasma and
            platelets. Each component is used to help patients with different
            medical conditions. The red cells are used to treat anemia, the
            plasma is used to treat bleeding disorders and the platelets are
            used to treat patients with low platelet counts.
          </p>
          <p>
            The red cells and plasma are used immediately. The platelets are
            frozen and used within five days. The plasma is frozen and used
            within one year. The red cells are frozen and used within 42 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
