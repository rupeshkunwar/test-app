terraform {
  required_version = ">= 1.6.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.34"
    }
  }
}

provider "digitalocean" {}

resource "digitalocean_project" "multi-k8s" {
  name        = var.NAME
  description = "A project to represent development resources."
  purpose     = "Web Application"
  environment = "Development"
}
