resource "digitalocean_kubernetes_cluster" "multi-k8s" {
  name   = "${secrets.CLUSTER_NAME}"
  region = "${var.REGION}"
  version = "${var.K8S_VERSION}"

  node_pool {
    name       = "${secrets.CLUSTER_NAME}-node"
    size       = "${var.IMAGE}"
    node_count = 4

    taint {
      key    = "workloadKind"
      value  = "database"
      effect = "NoSchedule"
    }
  }
}