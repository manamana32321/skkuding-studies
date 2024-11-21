# ===== 버킷 설정 =====
resource "aws_s3_bucket" "skkuding-study" {
  bucket = "skkuding-study"
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