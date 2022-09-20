import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import QuizesTable from "../../Components/QuizesTable/QuizesTable";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Home</h3>
      <Button onClick={() => navigate("/add-quiz")}>
        Add New Quiz <Add />
      </Button>
      <Grid>
        <QuizesTable />
      </Grid>
    </div>
  );
};

export default Home;
