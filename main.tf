terraform {
  backend "s3" {
    bucket         = "skkuding-study"
    key            = "terraform.tfstate"
    region         = "ap-northeast-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-northeast-2"
  # profile = "skkuding-study"
}

# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}

# Call the S3 module
module "s3" {
  source = "./modules/s3"
}