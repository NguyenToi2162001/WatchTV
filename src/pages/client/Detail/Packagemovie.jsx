import React, { useContext, useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContextPlans } from "../../../context/PlansProvider";
import { ContextPeatures } from "../../../context/PeaturesProvider";
import { getAllObjectById } from '../../../services/ResponsitoryService';
import { MdOutlineCancel } from "react-icons/md";

function Packagemovie() {
    const plans = useContext(ContextPlans);
    const peatures = useContext(ContextPeatures);

    const [clickedPlanID, setClickedPlanID] = useState(null);

    const handleClick = (planID) => {
        setClickedPlanID(planID); // Cập nhật clickedPlanID khi người dùng chọn gói
    };

    // Theo dõi sự thay đổi của clickedPlanID
    useEffect(() => {
        console.log("Clicked Plan ID: ", clickedPlanID); // Log ID khi thay đổi
    }, [clickedPlanID]);

    return (
        <div className='bg-slate-200'>
            <p className='text-center text-2xl font-bold pt-3'>Chọn gói WatchTV</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-8">
                {plans?.sort((a, b) => a.lever - b.lever).map((plan) => (
                    <div
                        key={plan.id} // Sử dụng ID của plan làm key duy nhất
                        className={`border border-black-1 px-6 py-10 rounded-lg ${clickedPlanID === plan.id ? 'bg-gray-300' : 'bg-white'}`}
                        onClick={() => handleClick(plan.id)} // Gọi handleClick với plan.id
                    >
                        <p className="font-bold text-xl">{plan?.title}</p>
                        <p className="font-bold text-xl">{plan?.pricePerMonth}/month</p>                 
                        
                        <hr className='mt-2'/>
                        {getAllObjectById(plan?.id, peatures)?.map((feature) => (
                            <div key={feature.id || feature.text} className="flex items-center mt-2 gap-3">
                                {feature.availiable ? (
                                    <MdOutlineCancel className="text-red-700" size={23} />
                                ) : (
                                    <FaCheck className="text-green-600" size={23} />
                                )}
                                <p className="flex-1">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={'flex justify-center pb-4'}>
                <Link to={`/Detail/Payment/${clickedPlanID}`}>
                    <Button className='text-center' variant="outlined" disabled={!clickedPlanID}>
                        Tiếp tục
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Packagemovie;
