import React, { useState } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

interface PhoneInputComponentProps extends PhoneInputProps {
    onPhoneChange: (phoneNumber: string, selectedCountry: any) => void;
    placeholder?: string;  
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({ onPhoneChange, placeholder, ...rest }) => {
    const [mobilenumber, setPhoneNumber] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<any>(null);

    const handlePhoneChange = (value: string, country: any) => {
        setPhoneNumber(value);
        setSelectedCountry(country);
        onPhoneChange(value, country);  
    };

    return (
        <>
            <PhoneInput
                country={'in'}
              
                value={mobilenumber}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%', paddingLeft: '45px' }}
            />
        </>
    );
};

export default PhoneInputComponent;
