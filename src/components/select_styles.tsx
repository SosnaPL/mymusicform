export const select_style = {
    container: (styles) => ({
        width: '200px',
        "@media only screen and (max-width: 550px)": {
            ...styles["@media only screen and (max-width: 550px)"],
            width: '50%'
        },
    }),
    singleValue: styles => ({
        ...styles,
        color: '#9b9b9b'
    }),
    input: styles => ({
        ...styles,
        color: '#9b9b9b'
    }),
    control: styles => ({
        ...styles,
        backgroundColor: 'rgb(16, 15, 20)',
        color: '#9b9b9b',
        borderRadius: 8,
        boxShadow: 'none',
        borderColor: 'transparent',
        ":hover": {
            backgroundColor: 'rgb(16, 15, 20)',
            boxShadow: 'none',
            borderColor: 'transparent',
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        width: '200px',
        color: state.selectProps.menuColor,
        borderRadius: 8,
        top: '220px',
        backgroundColor: 'rgb(16, 15, 20)',
        "@media only screen and (max-width: 550px)": {
            top: '265px',
            width: 'calc(50% - 10px)'
        },
    }),
    option: (provided) => ({
        ...provided,
        display: 'flex',
        minWidth: '100%',
        color: '#9b9b9b',
        borderRadius: 8,
        background: 'transparent',
        transition: 'background .2s ease-in-out',
        ':hover': {
            background: '#3a7470'
        },
    }),
}
