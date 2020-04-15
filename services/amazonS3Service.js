const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { USER_DATA_STORAGE } = require("@constants/constants");

const {AWS_Access_Key_Id, AWS_Secret_Key} = require("@constants/enviromentConstants");

class AmazonS3Service {
    async copyFileToS3(task, data) {
        AWS.config.update({
            accessKeyId: AWS_Access_Key_Id,
            secretAccessKey: AWS_Secret_Key,
        });

        const s3 = new AWS.S3();

        const params = {
            Bucket: "etl-tool-internship",
            Body: data[task.settings.variable].buffer,
            Key: data[task.settings.variable].data.name,
        };

        s3.upload(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            }

            if (data) {
                console.log("Uploaded in:", data.Location);
            }
        });
    }

    async getFileFromS3() {
        return new Promise((resolve) => {
            AWS.config.update({
                accessKeyId: AWS_Access_Key_Id,
                secretAccessKey: AWS_Secret_Key,
            });

            const params = {
                Bucket: "etl-tool-internship",
                Key: "mockData.xlsx",
            };

            const s3 = new AWS.S3();
            s3.getObject(params, (err, data) => {
                if (err) console.error(err);
                resolve(data.Body);
            });
        })
    }
}

module.exports = new AmazonS3Service();
