#!/usr/bin/env bash

. ./group-67-openrc.sh; ansible-playbook --ask-become-pass remove_deploy_instances.yaml