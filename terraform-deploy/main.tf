terraform {
  required_version = "~> 1.1.3"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {}

resource "digitalocean_project" "multi-k8s" {
  name        = "${var.NAME}"
  description = "A project to represent development resources."
  purpose     = "Web Application"
  environment = "Development"
}


