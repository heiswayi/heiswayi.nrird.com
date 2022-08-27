# frozen_string_literal: true

Gem::Specification.new do |spec|
	spec.name          = "heiswayi.nrird.com"
	spec.version       = "22.8.28"
	spec.authors       = ["Heiswayi Nrird"]
	spec.email         = ["hnrird@gmail.com"]
  
	spec.summary       = "Jekyll source code for https://heiswayi.nrird.com site"
	spec.homepage      = "https://heiswayi.nrird.com"
	spec.license       = "MIT"
  
	spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
  
	spec.add_runtime_dependency "jekyll", "~> 3.3"
  end  