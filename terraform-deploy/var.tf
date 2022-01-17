variable "NAME" {
    default = "${secrets.CLUSTER_NAME}"
}
variable "REGION" {
  default = "blr1"
}
variable "IMAGE"{
    default = "s-2vcpu-2gb"
}
variable "K8S_VERSION" {
    default = "1.21.5-do.0"
}
variable "ACCESS_KEY" {
    default = "${secrets.AWS_ACCESS_KEY_ID}"
}
variable "SECRET_KEY" {
    default = "${secrets.AWS_SECRET_ACCESS_KEY}"
}