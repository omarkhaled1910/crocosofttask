import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuiz } from "../../QuizContext/quizContext";
import { useNavigate } from "react-router-dom";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
const QuizesTable = () => {
  const { quizes } = useQuiz();
  const nanigate = useNavigate();
  return (
    <div style={{ marginTop: "40px" }}>
      <TableContainer
        style={{ width: "70%", margin: "auto" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(quizes[0])?.map((key, i) => (
                <TableCell key={i}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {quizes?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                {Object.keys(row).map((key, i) => (
                  <TableCell
                    onClick={() =>
                      key === "title" && nanigate(`/edit-quiz/${row?.id}`)
                    }
                    key={i}
                  >
                    {Array.isArray(row?.[key])
                      ? row?.[key]?.length
                      : row?.[key]
                      ? row?.[key]
                      : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizesTable;
