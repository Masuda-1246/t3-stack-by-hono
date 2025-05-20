#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyAppStack } from '../lib/infra-stack';

const app = new cdk.App()
new MyAppStack(app, 'MyAppStack')
