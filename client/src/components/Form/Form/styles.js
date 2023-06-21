import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        border: "none",
        // paddingBottom: "7px",
        // paddingTop: "6px",
      },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-10px',
  },
  h5Heading:{
    borderBottom: "1px solid #bbb",
    paddingBottom: "0px",
    margin: "40px 0 10px",
    // marginBottom: "0"
  },
  button: {
    marginTop: '20px',
  },
}));