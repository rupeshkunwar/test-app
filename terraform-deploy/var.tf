variable "NAME" {
  description = "Name of the Kubernetes cluster"
  type        = string
}

variable "REGION" {
  description = "DigitalOcean region for the cluster"
  type        = string
  default     = "blr1"
}

variable "IMAGE" {
  description = "Droplet size for worker nodes"
  type        = string
  default     = "s-2vcpu-4gb"
}

variable "K8S_VERSION" {
  description = "Kubernetes version for the cluster"
  type        = string
  default     = "1.29.9-do.0"
}

variable "NODE_COUNT" {
  description = "Number of worker nodes"
  type        = number
  default     = 3
}
