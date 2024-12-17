import React, { useContext, useState } from 'react';
import { GiCancel } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContextPlans } from "../../../context/PlansProvider";
import { ContextPeatures } from "../../../context/PeaturesProvider";
import { getObjectById, getPeatureRents } from '../../../services/ResponsitoryService'
import { PaymentsProvider } from '../../../context/PaymentsProvider';
function Packagemovie(props) {
    const plans = useContext(ContextPlans);
    const peatures = useContext(ContextPeatures);
    const PeatureRent1 = getPeatureRents(plans, peatures, "1");
    const PeatureRent2 = getPeatureRents(plans, peatures, "2");
    const PeatureRent3 = getPeatureRents(plans, peatures, "3");
    const PeatureRent4 = getPeatureRents(plans, peatures, "4");

    const [clickedPlanID, setClickedPlanID] = useState(null);
    const handleClick = (planID) => {
        setClickedPlanID(planID); // Store the planID of the clicked item
    };
    return (

            <div className='bg-slate-200'>
                <p className='text-center text-2xl font-bold pt-3'>Chọn gói WatchTV</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
                    {[PeatureRent1, PeatureRent2, PeatureRent3, PeatureRent4].map((peatureRent, index) => (
                        <div
                            key={index}
                            className={`border border-black-1 px-6 py-10 rounded-lg ${clickedPlanID === peatureRent[0]?.planID ? 'bg-gray-300' : 'bg-white'}`}
                            onClick={() => handleClick(peatureRent[0]?.planID)} // Pass planID to handleClick
                        >
                            <p className="font-bold text-xl">
                                {getObjectById(peatureRent[0]?.planID, plans)?.title}
                            </p>
                            <p className="font-bold text-xl">
                                {getObjectById(peatureRent[0]?.planID, plans)?.pricePerMonth}/month
                            </p>
                            <hr className="mt-2" />
                            {peatureRent.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center mt-2">
                                    <FaCheck />
                                    <p className="ms-3">{feature.text}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='flex justify-center pb-4'>
                    <Link to="/Detail/Payment">
                        <Button className='text-center' variant="outlined">Tiếp tục</Button>
                    </Link>
                </div>
            </div>
    );
}

export default Packagemovie;