import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormCard from "../components/ui/FormCard";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles({
    textFieldStyle: {
        margin: "10px",
    },
    submitBtn: {
        margin: "4px 0 4px auto",
        width: "40%",
    },
    additionalTexBox: {
        outline: "none",
        resize: "none",
        margin: "10px",
        width: "90%",
    },
});

const DeveloperSubmissionPage: React.FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Volunteer Application Submission</title>
            </Head>

            <div className="page-wrapper">
                <div className="form-wrapper">
                    <FormCard>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="name-container container">
                                <TextField
                                    id="outlined-basic"
                                    label="Firstname"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register({
                                        required: "Required",
                                    })}
                                    required
                                    name="firstname"
                                    error={!!errors.firstname}
                                    helperText={errors.firstname?.message}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="Lastname"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register({
                                        required: "Required",
                                    })}
                                    required
                                    name="lastname"
                                    error={!!errors.lastname}
                                    helperText={errors.lastname?.message}
                                />
                            </div>

                            <div className="social-container container">
                                <TextField
                                    id="outlined-basic"
                                    label="GitHub"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register}
                                    name="github"
                                    error={!!errors.github}
                                    helperText={errors.github?.message}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="LinkIn"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register}
                                    name="linkin"
                                />
                            </div>

                            <div className="contact-container container">
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register({
                                        required: "Required",
                                    })}
                                    required
                                    name="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                    inputRef={register}
                                    name="phonenumber"
                                />
                            </div>

                            <div className="additional-info-container container">
                                <TextField
                                    id="outlined-mulltiline-static"
                                    label="Tell us about yourself"
                                    variant="outlined"
                                    className={classes.additionalTexBox}
                                    inputRef={register({
                                        required: "Required",
                                    })}
                                    required
                                    name="about"
                                    multiline
                                    rows={6}
                                />
                            </div>

                            <div className="submit-btn-container container">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitBtn}
                                    fullWidth
                                    type="submit"
                                >
                                    Submit
                                </Button>{" "}
                            </div>
                        </form>
                    </FormCard>
                </div>

                <div className="img-container">
                    <img src="developer-form-img.svg" alt="" />
                </div>
            </div>

            <style jsx>{`
                .page-wrapper {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap-reverse;
                    align-items: center;
                    text-align: center;
                }

                .form-wrapper {
                    width: 50%;
                    min-height: 60vh;
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0 auto;
                    align-items: center;
                    text-align: center;
                    justify-content: space-evenly;
                }
                .container {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-evenly;
                }
                .img-container {
                    width: 40%;
                    margin: 0 auto;
                }
                img {
                    width: 100%;
                }
                textarea {
                    outline: none;
                    resize: none;
                    overflow: auto;

                    font-family: Inter;
                    font-style: normal;
                    font-weight: normal;
                }
                textarea:focus {
                    outline: #9d8dfe solid 2px;
                }
                .submit-btn-container {
                    width: 90%;
                }
                 {
                    /* normaly, the breaking point is 900px. */
                }
                @media (max-width: 933px) {
                    .form-wrapper {
                        width: 100%;
                        min-height: 80vh;
                    }
                    .img-container {
                        width: 80%;
                        margin: 50px auto 0 auto;
                    }
                }
            `}</style>
        </StaticLayout>
    );
};

export default DeveloperSubmissionPage;
