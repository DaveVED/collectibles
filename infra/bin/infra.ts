#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DynamoStack } from "../lib/stacks/dynamodb";
import { Construct } from "constructs";
const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };
const stage = app.node.tryGetContext("stage") || "development";
const formatedStage = stage.charAt(0).toUpperCase() + stage.slice(1);

export class ApplicationStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);
        new DynamoStack(this, "DynamoStack", {
            env,
            stage: stage,
        }); 
    };
};

new ApplicationStage(app, `TCGPriceGuide-${formatedStage}Stage`, {
    env,
});
