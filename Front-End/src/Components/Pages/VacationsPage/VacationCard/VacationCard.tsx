import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Favorite, FavoriteBorder, Info } from "@mui/icons-material";
import "./VacationCard.css";
import { useSelector } from "react-redux";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import Edit from "../Edit/Edit";
import { VacationWithKey } from "../../../../Models/VacationWithKey";
import axios from "axios";
import {
    addFollowAction,
    removeFollowAction,
} from "../../../../Redux/FollowReducer";
import notify from "../../../../Models/Notyf";
import Delete from "../Delete/Delete";

export default function BasicCard(props: VacationWithKey) {
    const role = useSelector((state: RootState) => state.users.role);
    const user = useSelector((state: RootState) => state.users.currentUser);
    const followers = useSelector(
        (state: RootState) => state.follower.followers
    );

    const isVacationFollowed = followers.some(
        (follow) =>
            follow.vacation_key === props.vacation_key &&
            follow.user_key === user?.user_key
    );

    const [isFollowing, setIsFollowing] = useState(isVacationFollowed);
    const [showDescription, setShowDescription] = useState(false);

    const addFollow = (vacation_key: number, user_key: number | null) => {
        if (user_key === null) {
            console.error("User key is null");
            return;
        }
        axios
            .post(
                `http://localhost:8080/api/v1/vacation/followers/follow/${user_key}/${vacation_key}`
            )
            .then((response) => {
                console.log(response.data);
                vacation.dispatch(addFollowAction(user_key, vacation_key));
                notify.success(
                    `You Add A Follower To ${props.destination} Vacation`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const removeFollow = (vacation_key: number, user_key: number | null) => {
        if (user_key === null) {
            console.error("User key is null");
            return;
        }
        axios
            .delete(
                `http://localhost:8080/api/v1/vacation/followers/RemoveFollow/${user_key}/${vacation_key}`
            )
            .then((response) => {
                console.log(response.data);
                vacation.dispatch(removeFollowAction(user_key, vacation_key));
                notify.error(
                    `You Removed A Follower From ${props.destination} Vacation`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const followerCount = followers.filter(
        (follow) => follow.vacation_key === props.vacation_key
    ).length;

    return (
        <Card
            className="Card"
            variant="soft"
            sx={{
                width: 290,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
            }}
        >
            {role === "admin" && (
                <div style={{ display: "flex" }}>
                    <Delete vacationToDelete={props} />
                    <Edit editVacation={props} />
                </div>
            )}
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {props.destination}
            </Typography>
            <Typography level="body2">
                <strong>
                    {props.start_date} - {props.end_date}
                </strong>
            </Typography>
            <AspectRatio
                minHeight="120px"
                maxHeight="200px"
                sx={{ my: 2, position: "relative" }}
            >
                <img
                    src={props.picture_file}
                    loading="lazy"
                    alt={props.picture_file}
                />
                {role === "user" && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "0.1rem",
                            left: "0.1rem",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(255,255,255,0.6)",
                            borderRadius: "5px",
                            padding: "0.5rem",
                            zIndex: 2,
                        }}
                    >
                        <IconButton
                            aria-label="favorite"
                            variant="plain"
                            className="icon-favorite"
                            size="sm"
                            color="danger"
                            style={{ fontVariant: "-moz-initial" }}
                            onClick={() => {
                                if (user && user.user_key !== undefined) {
                                    if (isFollowing) {
                                        removeFollow(
                                            props.vacation_key,
                                            user.user_key
                                        );
                                    } else {
                                        addFollow(
                                            props.vacation_key,
                                            user.user_key
                                        );
                                    }
                                    setIsFollowing(!isFollowing);
                                }
                            }}
                        >
                            {isFollowing ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography className="black-text">
                            {followerCount}
                        </Typography>
                    </Box>
                )}
            </AspectRatio>

            <Typography sx={{ overflowWrap: "break-word" }}>
                {props.description}
            </Typography>

            <Box sx={{ display: "flex" }}>
                <div>
                    <Typography level="body3">
                        <strong>Total price:</strong>
                    </Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        ${props.price}
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: "auto", fontWeight: 600 }}
                >
                    <strong>${props.price}</strong>
                </Button>
            </Box>
        </Card>
    );
}
