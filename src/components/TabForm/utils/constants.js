import Profile from "../components/Profile";
import Interest from "../components/Interest";
import Settings from "../components/Settings";

export const tabs = [
    {
        id: 1,
        name: 'Profile',
        component: Profile,
        validate: (data) => {
            const errors = {};
            if (data.name.length < 3) {
                errors.name = 'Name must be at least 3 characters long';
            }
            if (data.age < 18) {
                errors.age = 'You must be at least 18 years old';
            }
            if (!data.email.includes('outlook.com')) {
                errors.email = 'Email must be an outlook.com address';
            }
            return Object.keys(errors).length === 0 ? null : errors;
        }
    },
    {
        id: 2,
        name: 'Interest',
        component: Interest,
        validate: (data) => {
            const errors = {};
            if (data.interest.length < 1) {
                errors.interest = 'Atleast one interest must be selected';
            }
            return Object.keys(errors).length === 0 ? null : errors;
        }
    },
    {
        id: 3,
        name: 'Settings',
        component: Settings,
        validate: () => null
    }
];

