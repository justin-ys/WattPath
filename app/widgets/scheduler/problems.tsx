import { List, Text } from "react-native-paper"
import * as React from "react";


function Problem(props) {
    return <List.Item title={<Text>{props.problemText}</Text>}
                      left={props => <List.Icon {...props} icon="exclamation" />}/>
}

export default function Problems() {
    const problems = ["CourseDisplay 'ECE 124' is not offered in Fall 2024", "CourseDisplay 'PMATH 347' requires MATH 137 which is not satisfied"]
    return <div>
            <Text variant="titleMedium">{problems.length} {problems.length == 1 ? "problem" : "problems"} identified</Text>
        <div className="grid gap-4">
            {problems.map((problem: String) => <Problem problemText={problem} />)}
        </div>
    </div>
}