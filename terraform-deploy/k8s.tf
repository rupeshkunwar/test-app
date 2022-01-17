resource "digitalocean_kubernetes_cluster" "multi-k8s" {
  name   = "${var.NAME}"
  region = "${var.REGION}"
  version = "${var.K8S_VERSION}"

  node_pool {
    name       = "${var.NAME}-node"
    size       = "${var.IMAGE}"
    node_count = 4

    taint {
      key    = "workloadKind"
      value  = "database"
      effect = "NoSchedule"
    }
  }
}