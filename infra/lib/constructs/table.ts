import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export interface PrimaryIndex {
  partitionKey: string;
  sortKey?: string;
}

export interface GlobalIndex {
  partitionKey: string;
  sortKey?: string;
  projection?: string;
}

export interface TableProps {
  primaryIndex: PrimaryIndex;
  globalIndexes?: Record<string, GlobalIndex>; // Made globalIndexes optional
  tableName: string;
}

export class Table extends Construct {
  public readonly table: dynamodb.TableV2;

  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id);

    const tableProps: dynamodb.TablePropsV2 = {
      partitionKey: { name: props.primaryIndex.partitionKey, type: dynamodb.AttributeType.STRING },
      ...(props.primaryIndex.sortKey && {
        sortKey: { name: props.primaryIndex.sortKey, type: dynamodb.AttributeType.STRING },
      }),
      tableName: props.tableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    };

    this.table = new dynamodb.TableV2(this, props.tableName, tableProps);

    if (props.globalIndexes) {
      Object.entries(props.globalIndexes).forEach(([indexName, indexProps]) => {
        this.table.addGlobalSecondaryIndex({
          indexName,
          partitionKey: { name: indexProps.partitionKey, type: dynamodb.AttributeType.STRING },
          ...(indexProps.sortKey && {
            sortKey: { name: indexProps.sortKey, type: dynamodb.AttributeType.STRING },
          }),
          projectionType:
            indexProps.projection === "keys_only"
              ? dynamodb.ProjectionType.KEYS_ONLY
              : dynamodb.ProjectionType.ALL,
        });
      });
    }
  }
}

