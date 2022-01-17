terraform {
  backend "s3" {
    bucket = "rupeshaccern-s3-jenkins"
    key    = "digitalocean/terraform.tfstate"
    access_key = "${secrets.AWS_ACCESS_KEY_ID}"
    secret_key = "${secrets.AWS_SECRET_ACCESS_KEY}"
    region = "ap-south-1"
    skip_credentials_validation = true
    skip_metadata_api_check = true
  }
}