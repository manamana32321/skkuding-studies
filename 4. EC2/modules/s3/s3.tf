# ===== 버킷 설정 =====
resource "aws_s3_bucket" "skkuding-study" {
  bucket = "skkuding-study"

  tags = {
    project = "skkuding-study"
  }
}

resource "aws_s3_bucket_policy" "skkuding-study-policy" {
  bucket = aws_s3_bucket.skkuding-study.id

  policy = file("modules/s3/policy.json")
}

resource "aws_s3_bucket_public_access_block" "skkuding-study" {
  bucket = aws_s3_bucket.skkuding-study.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "index" {
  bucket = aws_s3_bucket.skkuding-study.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}



# ===== 정적 파일 설정 =====
resource "aws_s3_object" "index" {
  bucket = aws_s3_bucket.skkuding-study.bucket
  key    = "index.html"
  source = "modules/static/index.html"
  content_type = "text/html"
}

resource "aws_s3_object" "css" {
  bucket = aws_s3_bucket.skkuding-study.bucket
  key    = "style.css"
  source = "modules/static/style.css"
  content_type = "text/css"
}

resource "aws_s3_object" "js" {
  bucket = aws_s3_bucket.skkuding-study.bucket
  key    = "script.js"
  source = "modules/static/script.js"
  content_type = "application/javascript"
}


# ===== ELB 설정 =====
data "aws_lb" "default" {
  name = "default"
}

# ===== CloudFront 설정 =====
locals {
  s3_origin_id = "s3"
  elb_origin_id = "elb"
  elb_origin_domain = "default-1823977882.ap-northeast-2.elb.amazonaws.com"
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "default"
  description                       = "Default Policy"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "skkuding-study" {
  origin {
    domain_name              = aws_s3_bucket.skkuding-study.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  origin {
    domain_name = local.elb_origin_domain
    origin_id   = local.elb_origin_id

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "match-viewer"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  default_root_object = "index.html"


  // S3 캐시 설정
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  // ELB 캐시 설정
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.elb_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["KR"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    project = "skkuding-study"
  }
}