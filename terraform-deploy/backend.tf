terraform {
  backend "s3" {
    bucket = "rupeshaccern-s3-jenkins"
    key    = "digitalocean/terraform.tfstate"
    region = "ap-south-1"
    skip_requesting_account_id = true
    skip_credentials_validation = true
    skip_get_ec2_platforms = true
    skip_metadata_api_check = true
  }
}