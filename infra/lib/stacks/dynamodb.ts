import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Table } from "../constructs/table";

export interface DynamoStackProps extends cdk.StackProps {
    stage: string;
};

export class DynamoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DynamoStackProps) {
        super(scope, id, props);
        
        new Table(this, "Table", {
            tableName: props.stage === "development" ? "TCGReferenceData-Development" : "TCGReferenceData-Production",
            primaryIndex: { 
                partitionKey: "SetID",
                sortKey: "SK",
            },
            globalIndexes: {
                "setNameAndSortKeyIndex": {
                    partitionKey: "SetName",
                    sortKey: "SK"
                },
                "sortKeyAndSetIdIndex": {
                    partitionKey: "SK",
                    sortKey: "SetID"
                },
            },
        });
    };
};
