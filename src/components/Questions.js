import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BigQuestionCard } from "./BigQuestionCard";
import { Spinner } from "./Spinner";
import { Link } from 'react-router-dom';
import {ReactComponent as Prev} from "../Assets/Rest/Left.svg"
import {ReactComponent as Next} from "../Assets/Rest/Right.svg"
import {ReactComponent as PrevActive} from "../Assets/Click/Left.svg"
import {ReactComponent as NextActive} from "../Assets/Click/Right.svg"

export const Questions = () => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const [questions, setQuestions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    let history = useHistory();
    // Get the questions
    const getQuestions = async (pg) => {
        // api call
        const response = await fetch(`${host}/api/questions/fetch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                page: pg,
            }),
        });
        const json = await response.json();
        setQuestions(json.questions);
        const pgs = json.count;
        setPageCount(Math.ceil(pgs/15));
    };


    useEffect(() => {
        if (localStorage.getItem("token")) {
                getQuestions(1);
        } else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="questions">
            {!questions.length && <Spinner/>}
            <div className="big">
                {questions.length ? <BigQuestionCard color='green' content={questions[0]}/>:""}
                {questions.length>1 ? <BigQuestionCard color='magenta' content={questions[1]}/>:""}
            </div>
            <div className="sub-heading">
                    <div className="sub-heading-text">
                        <div className="heading-more">
                            More questions
                        </div>
                        <div className="all-tags">
                            <Link className="all-tags-link" to='/tags-all'>
                                View all tags &rarr;
                            </Link>
                        </div>
                    </div>
                    <div className="buttons-next-prev">
                        {/* <Prev className="prev-next-btn"/> */}
                        <PrevActive className="prev-next-btn"/>
                        {/* <Next className="prev-next-btn"/> */}
                        <NextActive className="prev-next-btn"/>
                    </div>
                </div>
            {questions.length>2 && <div>hihi</div>}
        </div>
    );
};
