import { useMutation, useQuery } from "@apollo/client";
import { Grid, Stepper, Accordion, Title, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Circle1, Circle2, Circle3, Circle4, CircleCheck } from 'tabler-icons-react';
import { CHANGE_STAGE, CURRENT_USER } from "../../queries/auth";
import "./JourneyPage.css"

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        border: '1px solid transparent',
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-180deg)',
        },
    },
    separator: {
        borderTop: `2px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
        borderRadius: theme.radius.xl,
        backgroundColor: 'inherit',
    },

    separatorActive: {
        borderWidth: 0,
        backgroundImage: theme.fn.linearGradient(45, theme.colors.blue[6], theme.colors.cyan[6]),
    },
}));

export default function JourneyPage() {
    const { loading, error, data, refetch } = useQuery(CURRENT_USER)
    const navigate = useNavigate()
    const location = useLocation()
    const [active, setActive] = useState(1);
    const { classes } = useStyles();
    const [value, setValue] = useState("step1");
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (loading) console.log('Loading user...')
        else if (error) { setActive(0); setValue('step1') }
        else {
            console.log(data);
            if (data.currentUser == null) {
                setActive(0); setValue('step1')
            } else {
                setUserid(data.currentUser.userid); setActive(data.currentUser.learnstage); setValue("step" + (data.currentUser.learnstage + 1))
            }
        }
    }, [loading, error, data, location.pathname])

    const [changeStage] = useMutation(CHANGE_STAGE, {
        onCompleted: ({ changeStage }) => {
            if (changeStage.response) {
                console.log(changeStage.response)
            }
        }
    })
    return (
        <div className="container pad-top pad-btm ">
            <Title style={{ margin: 'auto', width: '50%', paddingTop: '20px' }}>Learn to become a Trade Expert from Today!</Title>
            <Grid style={{ paddingTop: "80px" }}>
                <Grid.Col span={4}>
                    <Stepper classNames={classes} active={active} orientation="vertical" breakpoint={755} style={{ margin: 'auto', width: '50%', marginTop: '50px', backgroundColor: "inherit" }}>
                        <Stepper.Step label="Step 1" description="Create an account" />
                        <Stepper.Step label="Step 2" description="Try paper trading" />
                        <Stepper.Step label="Step 3" description="Connect with APIs" />
                        <Stepper.Step label="Step 4" description="Participate in contest" />
                    </Stepper>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Accordion value={value} onChange={setValue} variant="contained" sx={{ maxWidth: '70%' }} classNames={classes} className={classes.root}>
                        <Accordion.Item value="step1">
                            <Accordion.Control icon={active > 0 ? <CircleCheck size={30} color={'#2d863c'} /> : <Circle1 size={30} />}>
                                <b>Step 1 - Register an account</b>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div className="accordion-lbl-small">
                                    Task
                                </div>
                                <div className="can-desc">
                                    <h3>Register an account with mobile</h3>
                                    to experience the journey
                                </div>
                                <br />
                                <div className="accordion-lbl-small">
                                    Details
                                </div>
                                <div className="can-desc">
                                    - This will take you not more than 5 minutes<br />
                                    - If you encountered any difficulties, <b>contact NUS FinTech Lab for help</b>
                                </div>
                                <br />
                                <div className="text-center" style={{ cursor: active > 0 ? 'not-allowed' : "pointer" }}>
                                    <Link to="../register" className={active > 0 ? "btn-cta-can finlab-lite-a inverse inactive" : "btn-cta-can finlab-lite-a inverse"} data-stepid="1" data-stepparent="1" data-steptotal="1" data-parentid="collapseOne" tabIndex="0">
                                        Register Now</Link>
                                    <div className="cta-extra-text text-center">
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="step2">
                            <Accordion.Control icon={active > 1 ? <CircleCheck size={30} color={'#2d863c'} /> : <Circle2 size={30} />}>
                                <b>Step 2 - Try paper trading</b>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div className="accordion-lbl-small">
                                    Task
                                </div>
                                <div className="can-desc">
                                    <h3>Try paper trading </h3>
                                    to gain market experience in our simulated market
                                </div>
                                <br />
                                <div className="accordion-lbl-small">
                                    Details
                                </div>
                                <div className="can-desc">
                                    - Try to place different types of orders, and see how they are executed in the market<br />
                                    - Check your initial wallet in Asset page, <b>top up your balance if you need</b>
                                </div>
                                <br />
                                <div className="text-center" onClick={() => {
                                    if (!data) {
                                        navigate("/register")
                                    }
                                    changeStage({ variables: { userid: userid, stage: 2 } })
                                }}>
                                    <Link to="../trade/btcusd" className="btn-cta-can finlab-lite-a inverse" data-stepid="1" data-stepparent="1" data-steptotal="1" data-parentid="collapseOne" tabIndex="0">
                                        Try Now</Link>
                                    <div className="cta-extra-text text-center">
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="step3">
                            <Accordion.Control icon={active > 2 ? <CircleCheck size={30} color={'#2d863c'} /> : <Circle3 size={30} />}>
                                <b>Step 3 - Connect with APIs</b>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div className="accordion-lbl-small">
                                    Task
                                </div>
                                <div className="can-desc">
                                    <h3>Connect with the website via APIs</h3>
                                    to start your coding journey and develop your own trading bot
                                </div>
                                <br />
                                <div className="accordion-lbl-small">
                                    Details
                                </div>
                                <div className="can-desc">
                                    - Follow the tutorial provided and play around with your local environment<br />
                                    - If you encountered any difficulties, <b>contact NUS FinTech Lab for help</b>
                                </div>
                                <br />
                                <div className="text-center" onClick={() => {
                                    if (!data) {
                                        navigate("/register")
                                    }
                                    changeStage({ variables: { userid: userid, stage: 3 } })
                                }}>
                                    <Link to="../assets" className="btn-cta-can finlab-lite-a inverse" data-stepid="1" data-stepparent="1" data-steptotal="1" data-parentid="collapseOne" tabIndex="0">
                                        Learn Now</Link>
                                    <div className="cta-extra-text text-center">
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="step4">
                            <Accordion.Control icon={active > 3 ? <CircleCheck size={30} color={'#2d863c'} /> : <Circle4 size={30} />}>
                                <b>Step 4 - Join our contest</b>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div className="accordion-lbl-small">
                                    Task
                                </div>
                                <div className="can-desc">
                                    <h3>Contest every week</h3>
                                    to compete and see your ranking!
                                </div>
                                <br />
                                <div className="accordion-lbl-small">
                                    Details
                                </div>
                                <div className="can-desc">
                                    - Compete with other well-developed trading bots and try to profit from the fierece market<br />
                                    - Try your best to get a high return, but remember <b>the ranking will be calculated based on multiple metrics</b>
                                </div>
                                <br />
                                <div className="text-center" onClick={() => {
                                    if (!data) {
                                        navigate("/register")
                                    }
                                    changeStage({ variables: { userid: userid, stage: 4 } })
                                }}>
                                    <Link to="../contest" className="btn-cta-can finlab-lite-a inverse" data-stepid="1" data-stepparent="1" data-steptotal="1" data-parentid="collapseOne" tabIndex="0">
                                        Join Now</Link>
                                    <div className="cta-extra-text text-center">
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>

                </Grid.Col>
            </Grid>

        </div >
    )
}
